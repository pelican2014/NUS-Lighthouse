<template>
  <highcharts :options="options" ref="sankey" class="sankey"></highcharts>
</template>

<script>
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';

(function (H) {
  /**
  * @todo
  * - Handle options for nodes. This can be added as special point items that
  *   have a flag, isNode, or type: 'node'. It would allow setting specific
  *   color, className etc. Then these options must be linked by id and used
  *   when generating the node items.
  * - Dynamics (Point.update, setData, addPoint etc).
  * - From and to can be null when links enter or exit the diagram.
  * - Separate data label and tooltip point formatters for nodes vs links? A
  *   possible pattern would be to add a point.type, and automate the
  *   implementation of formatters through the type, for example nodeFormat
  *   or tooltip.linkFormat. This could be reused for other series types,
  *   even generic like point.format = 'null' => tooltip.nullFormat.
  */

  const defined = H.defined;
  const each = H.each;


  H.seriesType('sankey', 'column', {
    colorByPoint: true,
    dataLabels: {
      enabled: true,
      backgroundColor: 'none', // enable padding
      crop: false,
      formatter() {
        return this.point.isNode && this.point.id;
        // Include data labels for the links like this:
        // return this.point.isNode ? this.point.id : this.point.weight;
      },
      inside: true,
    },
    linkOpacity: 0.5,
    nodeWidth: 20,
    nodePadding: 10,
    showInLegend: false,
    states: {
      hover: {
        linkOpacity: 1,
      },
    },
    tooltip: {
      followPointer: true,
      headerFormat:
      '<span style="font-size: 0.85em">{series.name}</span><br/>',
      pointFormatter() {
        if (this.isNode) {
          return this.id + ': ' + this.sum();
        }
        return this.from + ' \u2192 ' + this.to +
        ': <b>' + this.weight + '</b>';
      },
    },

  }, {
    isCartesian: false,
    forceDL: true,
    /**
    * Create a single node that holds information on incoming and outgoing
    * links.
    */
    createNode(id) {
      let node = H.find(this.nodes, node => node.id === id);

      if (!node) {
        node = (new H.Point()).init(this, { isNode: true, id });
        node.linksTo = [];
        node.linksFrom = [];
        /**
        * Return the largest sum of either the incoming or outgoing links.
        */
        node.sum = function () {
          let sumTo = 0;
          let sumFrom = 0;
          each(node.linksTo, (link) => {
            sumTo += link.weight;
          });
          each(node.linksFrom, (link) => {
            sumFrom += link.weight;
          });
          return Math.max(sumTo, sumFrom);
        };
        /**
        * Get the offset in weight values of a point/link.
        */
        node.offset = function (point, coll) {
          let offset = 0;
          for (let i = 0; i < node[coll].length; i += 1) {
            if (node[coll][i] === point) {
              return offset;
            }
            offset += node[coll][i].weight;
          }
        };

        this.nodes.push(node);
      }
      return node;
    },

    /**
    * Create a node column.
    */
    createNodeColumn() {
      const chart = this.chart;
      const column = [];
      const nodePadding = this.options.nodePadding;

      column.sum = function () {
        let sum = 0;
        each(this, (node) => {
          sum += node.sum();
        });
        return sum;
      };
      /**
      * Get the offset in pixels of a node inside the column.
      */
      column.offset = function (node, factor) {
        let offset = 0;
        for (let i = 0; i < column.length; i += 1) {
          if (column[i] === node) {
            return offset;
          }
          offset += column[i].sum() * factor + nodePadding;
        }
      };

      /**
      * Get the column height in pixels.
      */
      column.top = function (factor) {
        let height = 0;
        for (let i = 0; i < column.length; i += 1) {
          if (i > 0) {
            height += nodePadding;
          }
          height += column[i].sum() * factor;
        }
        return (chart.plotHeight - height) / 2;
      };

      return column;
    },

    /**
    * Create node columns by analyzing the nodes and the relations between
    * incoming and outgoing links.
    */
    createNodeColumns() {
      const columns = [];
      each(this.nodes, function (node) {
        let fromColumn = 0;
        let i;
        let point;

        // No links to this node, place it left
        if (node.linksTo.length === 0) {
          node.column = 0;

          // There are incoming links, place it to the right of the
          // highest order column that links to this one.
        } else {
          for (i = 0; i < node.linksTo.length; i += 1) {
            point = node.linksTo[0];
            if (point.fromNode.column > fromColumn) {
              fromColumn = point.fromNode.column;
            }
          }
          node.column = fromColumn + 1;
        }

        if (!columns[node.column]) {
          columns[node.column] = this.createNodeColumn();
        }

        columns[node.column].push(node);
      }, this);
      return columns;
    },

    /**
    * Return the presentational attributes.
    */
    pointAttribs(point, state) {
      let opacity = this.options.linkOpacity;

      if (state) {
        opacity = this.options.states[state].linkOpacity || opacity;
      }

      return {
        fill: point.isNode ?
          point.color :
          H.color(point.color).setOpacity(opacity).get(),
      };
    },

    /**
    * Extend generatePoints by adding the nodes, which are Point objects
    * but pushed to the this.nodes array.
    */
    generatePoints() {
      const nodeLookup = {};

      H.Series.prototype.generatePoints.call(this);

      if (!this.nodes) {
        this.nodes = []; // List of Point-like node items
      }
      this.colorCounter = 0;

      // Reset links from previous run
      each(this.nodes, (node) => {
        node.linksFrom.length = 0;
        node.linksTo.length = 0;
      });

      // Create the node list
      each(this.points, function (point) {
        if (defined(point.from)) {
          if (!nodeLookup[point.from]) {
            nodeLookup[point.from] = this.createNode(point.from);
          }
          nodeLookup[point.from].linksFrom.push(point);
          point.fromNode = nodeLookup[point.from];
        }
        if (defined(point.to)) {
          if (!nodeLookup[point.to]) {
            nodeLookup[point.to] = this.createNode(point.to);
          }
          nodeLookup[point.to].linksTo.push(point);
          point.toNode = nodeLookup[point.to];
        }
      }, this);
    },

    /**
    * Run pre-translation by generating the nodeColumns.
    */
    translate() {
      this.generatePoints();

      this.nodeColumns = this.createNodeColumns();

      const chart = this.chart;
      const options = this.options;
      let left = 0;
      const nodeWidth = options.nodeWidth;
      const nodeColumns = this.nodeColumns;
      const colDistance = (chart.plotWidth - nodeWidth) /
        (nodeColumns.length - 1);
      const curvy = colDistance / 3;
      let factor = Infinity;

      // Find out how much space is needed. Base it on the translation
      // factor of the most spaceous column.
      each(this.nodeColumns, (column) => {
        const height = chart.plotHeight -
        (column.length - 1) * options.nodePadding;

        factor = Math.min(factor, height / column.sum());
      });

      each(this.nodeColumns, (column) => {
        each(column, (node) => {
          const height = node.sum() * factor;
          const fromNodeTop = column.top(factor) + column.offset(node, factor);

          // Draw the node
          node.shapeType = 'rect';
          node.shapeArgs = {
            x: left,
            y: fromNodeTop,
            width: nodeWidth,
            height,
          };
          // Pass test in drawPoints
          node.y = node.plotY = 1;

          // Draw the links from this node
          each(node.linksFrom, (point) => {
            const linkHeight = point.weight * factor;
            const fromLinkTop = node.offset(point, 'linksFrom') * factor;
            const fromY = fromNodeTop + fromLinkTop;
            const toNode = point.toNode;
            const toColTop = nodeColumns[toNode.column].top(factor);
            const toY = toColTop + toNode.offset(point, 'linksTo') * factor
            + nodeColumns[toNode.column].offset(
              toNode,
              factor,
            );
            const right = toNode.column * colDistance;

            point.shapeType = 'path';
            point.shapeArgs = {
              d: [
                'M', left + nodeWidth, fromY,
                'C', left + nodeWidth + curvy, fromY,
                right - curvy, toY,
                right, toY,
                'L', right, toY + linkHeight,
                'C', right - curvy, toY + linkHeight,
                left + nodeWidth + curvy, fromY + linkHeight,
                left + nodeWidth, fromY + linkHeight,
                'z',
              ],
            };

            // Place data labels in the middle
            point.dlBox = {
              x: left + (right - left + nodeWidth) / 2,
              y: fromY + (toY - fromY) / 2,
              height: linkHeight,
              width: 0,
            };
            // Pass test in drawPoints
            point.y = point.plotY = 1;

            if (!point.color) {
              point.color = node.color;
            }
          });
        });
        left += colDistance;
      }, this);
    },
    /**
    * Extend the render function to also render this.nodes together with
    * the points.
    */
    render() {
      const points = this.points;
      this.points = this.points.concat(this.nodes);
      H.seriesTypes.column.prototype.render.call(this);
      this.points = points;
    },
    animate: H.Series.prototype.animate,
  });
}(Highcharts));

export default {
  components: {
    HighchartsVue,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    subtitle: {
      type: String,
      default: 'Source: NUS Datalake',
    },
  },
  computed: {
    options() {
      return {
        chart: {
          type: 'sankey',
        },
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        series: [{
          keys: ['from', 'to', 'weight'],
          data: this.data,
          name: 'Future Trajectory Sankey',
        }],
      };
    },
  },
};
</script>

<style scoped>
.sankey {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
