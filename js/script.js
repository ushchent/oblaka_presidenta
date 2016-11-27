var color = d3.scale.ordinal()
            .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00']);

var font_scale = d3.scale.linear()
					.range([6, 40]);

var svg = d3.select("#word_cloud").append("svg")
                .attr("width", 850)
                .attr("height", 350)
                .attr("class", "wordcloud")
                .append("g")
                .attr("transform", "translate(320,200)");

function draw(words) {
	var words = svg.selectAll("text")
                .data(words)

    words.enter().append("text");
    
	words.style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });

	words.exit().remove()
    }

function main(data) {
	font_scale.domain([0, d3.max(data, function(d) {return d.size; })]);
	color.domain([d3.min(data, function(d) {return d.size; }), d3.max(data, function(d) {return d.size; })]);
    d3.layout.cloud().size([800, 300])
            .words(data)
            .rotate(0)
            .fontSize(function(d) { return font_scale(d.size); })
            .padding(1)
            .text(function(d) { return d.text; })
            .on("end", draw)
            .start();
}

d3.json("data/trend_2016-11-25.json", main)

d3.selectAll("li").on("click", function() {
	var clicked_item = d3.select(this);
	d3.selectAll(".active").classed("active", false);
	clicked_item.classed("active", true)
	var data_link = clicked_item.attr("title");
	d3.json(data_link, main);

	});
