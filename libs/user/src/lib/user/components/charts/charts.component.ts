import { Store } from '@ngrx/store';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { getSelectedUser } from '../../+state/selectors/frnds_app.selectors';
import { User } from '../../types/frnds-app-state.interface';
import { SimpleDataModel } from './data.interface';
import { D3Service } from './data.service';

@Component({
  selector: 'charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ChartsComponent implements OnInit {
  user$: Observable<User | null | undefined>;

  // The radius of the pie chart is half the smallest side
  public chartId: any;
  public isPercentage = true;
  public enablePolylines = false;
  public pieData: Array<SimpleDataModel> = [];
  public textColor = "#ffffff";
  public username: string;
  public frndCount: number;
  private colors: any;
  private svg: any;
  private margin = 25;
  private width = 650;
  private height = 650;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private d3: D3Service,
    private store: Store
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  ngOnInit() {
    this.createSvg();
    this.createColors();
    this.user$ = this.store.select(getSelectedUser).pipe(takeUntil(this._unsubscribeAll));
    this.user$.subscribe(res => {
      if (res && res.friends && res.chartData && res.chartData.length !== 0) {
        this.pieData = res.chartData;
        this.chartId = this.d3.generateId(5);
        this.pieData = res?.chartData;
        this.drawChart();
      }
    })
  }

  /**
  * On destroy
  */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Prepare the canvas
  // -----------------------------------------------------------------------------------------------------
  private createSvg(): void {
    this.svg = this.d3.d3
      .select("figure#pie")
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Generate the color scheme
  // -----------------------------------------------------------------------------------------------------

  private createColors(data = this.pieData): void {
    // Colors to user when
    this.colors = this.d3.d3
      .scaleOrdinal()
      .domain(data.map(d => d.value.toString()))
      .range([
        "#6773f1",
        "#32325d",
        "#6162b5",
        "#6586f6",
        "#8b6ced",
        "#1b1b1b",
        "#212121"
      ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Generate charts
  // -----------------------------------------------------------------------------------------------------

  private drawChart(data = this.pieData): void {
    // Compute the position of each group on the pie
    const pie = this.d3.d3.pie<any>().value((d: any) => Number(d.value));
    const data_ready = pie(data);

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(this.width, this.height) / 2 - this.margin;

    const outerArc = this.d3.d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // The arc generator
    const arc = this.d3.d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // append the svg object to the div called 'my_dataviz'

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll("pieces")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        this.d3.d3
          .arc()
          .innerRadius(0)
          .outerRadius(this.radius)
      )
      .attr("fill", (d: any, i: any) => (d.data.color ? d.data.color : this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");
    // Now add the annotation. Use the centroid method to get the best coordinates
    const labelLocation = this.d3.d3
      .arc()
      .innerRadius(50)
      .outerRadius(this.radius);
    let dy = 0;
    let index = 0;
    this.svg
      .selectAll("pieces")
      .data(pie(data))
      .enter()
      .append("text")
      .text((d: any) => {
        if (
          ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5 ||
          !this.enablePolylines
        ) {
          return (
            d.data.name +
            " (" +
            d.data.value +
            (this.isPercentage ? "%" : "") +
            ")"
          );
        } else {
          return null;
        }
      })
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 28)
      .attr("fill", this.textColor);
    if (this.enablePolylines) {
      this.svg
        .selectAll("allLabels")
        .data(data_ready)
        .enter()
        .append("text")
        .text((d: any) => {
          if (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5) {
            return null;
          } else {
            return (
              d.data.name +
              " (" +
              d.data.value +
              (this.isPercentage ? "%" : "") +
              ")"
            );
          }
        })
        .style("font-size", "24px")
        .attr("dy", (d: any) => {
          if (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5) {
            return null;
          } else {
            let value = 0.35;
            if (index != 0) dy = dy + 1;
            index++;
            value = value + dy;
            return value.toString() + "em";
          }
        })
        .attr("transform", (d: any) => {
          if (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5) {
            return null;
          } else {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          }
        })
        .style("text-anchor", (d: any) => {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start" : "end";
        });
      index = 0;
      let addTo = 5;
      this.svg
        .selectAll("allPolylines")
        .data(data_ready)
        .enter()
        .append("polyline")
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr("points", (d: any) => {
          if (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 5) {
            return null;
          } else {
            const posA = arc.centroid(d); // line insertion in the slice
            const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
            const posC = outerArc.centroid(d); // Label position = almost the same as posB
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            posC[0] = posC[0] + addTo;
            posC[1] = posC[1] + addTo;
            addTo = addTo + 10;
            return [posA, posB, posC];
          }
        });
    }
  }

}
