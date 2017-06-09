import React from "react"
import { connect } from "react-redux"

import * as d3 from "d3"


class Graph extends React.Component {
    componentDidMount(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        /* Svg properties */
        const height = 700
        const width = 1400
        const padding = 80

        /* To save time by not having to calc this everytime */
        const length = this.props.data.monthlyVariance.length

        /* Svg */
        const svg = d3.select("svg")
            .attr("height", height)
            .attr("width", width)


        /*** Color ***/
        /* Color domain */
        const min = this.props.data.baseTemperature + (d3.min(this.props.data.monthlyVariance, (d) => d.variance))
        const max = this.props.data.baseTemperature + (d3.max(this.props.data.monthlyVariance, (d) => d.variance))
        const colorDomain = [min, (max + min) / 2 - 3, (max + min) / 2, (max + min) / 2 + 1, max]


        /* Color scale */
        const colorScale = d3.scaleLinear()
            .domain(colorDomain)
            .range(["#342350", "#66be89", "#ebed8d", "#e0a44a", "#a11b17"])


        /* Color range

        /*** X ***/
        /* X domain */
        const xDomain = [d3.min(this.props.data.monthlyVariance, (d) => d.year), d3.max(this.props.data.monthlyVariance, (d) => d.year)]

        /* X scale */
        const xScale = d3.scaleLinear()
            .domain(xDomain)
            .range([padding, width - padding])

        /* X axis */
        const xAxis = d3.axisBottom(xScale)
            .ticks(10)


        /*** Y ***/
        /* Y domain */
        const yDomain = [1, 12]

        /* Y scale */
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([padding, height - padding])

        /* Y axis */
        const yAxis = d3.axisLeft(yScale)
            .ticks(12)
            .tickFormat((d) => months[d - 1])

        /* Groups */
        /* X axis */
        svg.append("g")
            .call(xAxis)
            .attr("transform", "translate(0, " + (height - padding) + ")")

        /* Y axis */
        svg.append("g")
            .call(yAxis)
            .attr("transform", "translate(" + padding +"," + ( -padding / 4) +")")
            .attr("class", "y-axis")


        /* Rect */
        svg.append("g")
            .selectAll("rect")
            .data(this.props.data.monthlyVariance)
            .enter()
            .append("rect")
                .attr("width", 5)
                .attr("height", 49)
                .attr("x", (d, i) => xScale(d.year))
                .attr("y", (d) => yScale(d.month) - 49)
                .attr("fill", (d) => colorScale(this.props.data.baseTemperature + d.variance))
                .on("mouseover", (d) => {
                    tooltip.style("top",(d3.mouse(d3.event.currentTarget)[1]) + "px")
                        .style("left", (d3.mouse(d3.event.currentTarget)[0] + padding)+ "px")
                        .style("opacity", 0.9)
                        .html("<p>" + (d.year +", " + months[d.month - 1]) + "</p><p>" + ((this.props.data.baseTemperature + d.variance).toFixed(3)) + " °C</p><p>" + (d.variance.toFixed(3)) + " °C</p>")
                })
                .on("mouseout", () => tooltip.style("opacity", 0))


        /* Texts */
        /* Years */
        svg.append("text")
            .attr("class", "text")
            .attr("transform", "translate("+ ( width / 2 ) +", "+ (height - padding / 2) +")")
            .text("Years")

        /* Months */
        svg.append("text")
            .attr("class", "text")
            .attr("transform", "translate(20, "+ (height/ 2) +") rotate(270)")
            .text("Months")

        /* Tooltip */
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .html("hello")

        /* Color chart */
        const colorChartData = d3.range(min, max)

        /* Color rects */
        svg.append("g")
            .selectAll("rect")
            .data(colorChartData)
            .enter()
            .append("rect")
                .attr("width", 25)
                .attr("height", 20)
                .attr("x", (d, i) => (width - 390) + 25 * i)
                .attr("y", height - padding / 2 - 10)
                .attr("fill", (d) => colorScale(d))

        /* Color nums */
        svg.append("g")
            .selectAll("text")
            .data(colorChartData)
            .enter()
            .append("text")
                .attr("x", (d, i) => (width - 387) + 25 * i)
                .attr("y", height - padding / 2 + 20)
                .text((d) => d.toFixed(1))
                .style("font-size", 10 + "px")

        console.log(colorChartData)





        console.log(this.props.data)
        console.log(xDomain)


    }
    render() {
        return(
            <div className="container">
                <svg></svg>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Graph)
