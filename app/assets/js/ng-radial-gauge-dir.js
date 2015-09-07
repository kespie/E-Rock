/* global d3 */
/*
 ng-radial-gauge 1.0.1
 (c) 2010-2014 Stéphane Therrien, 
 https://github.com/stherrienaspnet/ngRadialGauge
 License: MIT
*/
"use strict";
angular.module("ngRadialGauge",[]).directive('ngRadialGauge', ['$window', '$timeout',
 function ($window, $timeout) {
     return {
         restrict: 'EAC',
         scope: {
             data: '=',
             lowerLimit: '=',
             upperLimit: '=',
             ranges: '=',
             value: '=',
             valueUnit: '=',
             precision: '=',
             majorGraduationPrecision: '=',
             label: '@',
             onClick: '&'
         },
         link: function (scope, ele, attrs) {
             var defaultUpperLimit = 100;
             var defaultLowerLimit = 0;
             var initialized = false;

             var renderTimeout;
             var gaugeAngle = parseInt(attrs.angle) || 90;
             var width = parseInt(attrs.width) || 300;
             var innerRadius = Math.round((width * 100) / 300);
             var outerRadius = Math.round((width * 145) / 300);
             var majorGraduations = parseInt(attrs.majorGraduations - 1) || 5;
             var minorGraduations = parseInt(attrs.minorGraduations) || 5;
             var majorGraduationLength = Math.round((width * 16) / 300);
             var minorGraduationLength = Math.round((width * 10) / 300);
             var majorGraduationMarginTop = Math.round((width * 7) / 300);
             var majorGraduationColor = attrs.majorGraduationColor || "#B0B0B0";
             var minorGraduationColor = attrs.minorGraduationColor || "#D0D0D0";
             var majorGraduationTextColor = attrs.majorGraduationTextColor || "#6C6C6C";
             var needleColor = attrs.needleColor || "#416094";
             var valueVerticalOffset = Math.round((width * 30) / 300);
             var inactiveColor = "#D7D7D7";
             var transitionMs = parseInt(attrs.transitionMs) || 750;
             var majorGraduationTextSize = parseInt(attrs.majorGraduationTextSize);
             var needleValueTextSize = parseInt(attrs.needleValueTextSize);
             var needle = undefined;

             //The scope.data object might contain the data we need, otherwise we fall back on the scope.xyz property
             var extractData = function (prop) {
                 if (!scope.data) return scope[prop];
                 if (scope.data[prop] === undefined || scope.data[prop] == null) {
                     return scope[prop];
                 }
                 return scope.data[prop];
             };

             var maxLimit;
             var minLimit;
             var value;
             var valueUnit;
             var precision;
             var majorGraduationPrecision;
             var ranges;
             
             var updateInternalData = function() {
                 maxLimit = extractData('upperLimit') ? extractData('upperLimit') : defaultUpperLimit;
                 minLimit = extractData('lowerLimit') ? extractData('lowerLimit') : defaultLowerLimit;
                 value = extractData('value');
                 valueUnit = extractData('valueUnit');
                 precision = extractData('precision');
                 majorGraduationPrecision = extractData('majorGraduationPrecision');
                 ranges = extractData('ranges');
             };
             updateInternalData();
             
             var svg = d3.select(ele[0])
                 .append('svg')
                 .attr('width', width)
                 .attr('height', width * 0.75);
             var renderMajorGraduations = function (majorGraduationsAngles) {
                 var centerX = width / 2;
                 var centerY = width / 2;
                 //Render Major Graduations
                 majorGraduationsAngles.forEach(function (pValue, index) {
                     var cos1Adj = Math.round(Math.cos((90 - pValue) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - majorGraduationLength));
                     var sin1Adj = Math.round(Math.sin((90 - pValue) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - majorGraduationLength));
                     var cos2Adj = Math.round(Math.cos((90 - pValue) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop));
                     var sin2Adj = Math.round(Math.sin((90 - pValue) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop));
                     var x1 = centerX + cos1Adj;
                     var y1 = centerY + sin1Adj * -1;
                     var x2 = centerX + cos2Adj;
                     var y2 = centerY + sin2Adj * -1;
                     svg.append("svg:line")
                     .attr("x1", x1)
                     .attr("y1", y1)
                     .attr("x2", x2)
                     .attr("y2", y2)
                     .style("stroke", majorGraduationColor);

                     renderMinorGraduations(majorGraduationsAngles, index);
                 });
             };
             var renderMinorGraduations = function (majorGraduationsAngles, indexMajor) {
                 var minorGraduationsAngles = [];

                 if (indexMajor > 0) {
                     var minScale = majorGraduationsAngles[indexMajor - 1];
                     var maxScale = majorGraduationsAngles[indexMajor];
                     var scaleRange = maxScale - minScale;

                     for (var i = 1; i < minorGraduations; i++) {
                         var scaleValue = minScale + i * scaleRange / minorGraduations;
                         minorGraduationsAngles.push(scaleValue);
                     }

                     var centerX = width / 2;
                     var centerY = width / 2;
                     //Render Minor Graduations
                     minorGraduationsAngles.forEach(function (pValue, indexMinor) {
                         var cos1Adj = Math.round(Math.cos((90 - pValue) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - minorGraduationLength));
                         var sin1Adj = Math.round(Math.sin((90 - pValue) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - minorGraduationLength));
                         var cos2Adj = Math.round(Math.cos((90 - pValue) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop));
                         var sin2Adj = Math.round(Math.sin((90 - pValue) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop));
                         var x1 = centerX + cos1Adj;
                         var y1 = centerY + sin1Adj * -1;
                         var x2 = centerX + cos2Adj;
                         var y2 = centerY + sin2Adj * -1;
                         svg.append("svg:line")
                         .attr("x1", x1)
                         .attr("y1", y1)
                         .attr("x2", x2)
                         .attr("y2", y2)
                         .style("stroke", minorGraduationColor);
                     });
                 }
             };
             var getMajorGraduationValues = function (pMinLimit, pMaxLimit, pPrecision) {
                 var scaleRange = pMaxLimit - pMinLimit;
                 var majorGraduationValues = [];
                 for (var i = 0; i <= majorGraduations; i++) {
                     var scaleValue = pMinLimit + i * scaleRange / (majorGraduations);
                     majorGraduationValues.push(scaleValue.toFixed(pPrecision));
                 }

                 return majorGraduationValues;
             };
             var getMajorGraduationAngles = function () {
                 var scaleRange = 2 * gaugeAngle;
                 var minScale = -1 * gaugeAngle;
                 var graduationsAngles = [];
                 for (var i = 0; i <= majorGraduations; i++) {
                     var scaleValue = minScale + i * scaleRange / (majorGraduations);
                     graduationsAngles.push(scaleValue);
                 }

                 return graduationsAngles;
             };
             var getNewAngle = function(pValue) {
                 var scale = d3.scale.linear().range([0, 1]).domain([minLimit, maxLimit]);
                 var ratio = scale(pValue);
                 var scaleRange = 2 * gaugeAngle;
                 var minScale = -1 * gaugeAngle;
                 var newAngle = minScale + (ratio * scaleRange);
                 return newAngle;
             };
             var renderMajorGraduationTexts = function (majorGraduationsAngles, majorGraduationValues, pValueUnit) {
                 if (!ranges) return;

                 var centerX = width / 2;
                 var centerY = width / 2;
                 var textVerticalPadding = 5;
                 var textHorizontalPadding = 5;

                 var lastGraduationValue = majorGraduationValues[majorGraduationValues.length - 1];
                 var textSize = isNaN(majorGraduationTextSize) ? (width * 12) / 200 : majorGraduationTextSize;
                 var fontStyle = textSize + "px Courier";

                 var dummyText = svg.append("text")
                     .attr("x", centerX)
                     .attr("y", centerY)
                     .attr("fill", "transparent")
                     .attr("text-anchor", "middle")
                     .style("font", fontStyle)
                     .text(lastGraduationValue + pValueUnit);

                 var textWidth = dummyText.node().getBBox().width;

                 for (var i = 0; i < majorGraduationsAngles.length; i++) {
                     var angle = majorGraduationsAngles[i];
                     var cos1Adj = Math.round(Math.cos((90 - angle) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - majorGraduationLength - textHorizontalPadding));
                     var sin1Adj = Math.round(Math.sin((90 - angle) * Math.PI / 180) * (innerRadius - majorGraduationMarginTop - majorGraduationLength - textVerticalPadding));

                     var sin1Factor = 1;
                     if (sin1Adj < 0) sin1Factor = 1.1;
                     if (sin1Adj > 0) sin1Factor = 0.9;
                     if (cos1Adj > 0) {
                         if (angle > 0 && angle < 45) {
                             cos1Adj -= textWidth / 2;
                         } else {
                             cos1Adj -= textWidth;
                         }
                     }
                     if (cos1Adj < 0) {
                         if (angle < 0 && angle > -45) {
                             cos1Adj -= textWidth / 2;
                         }
                     }
                     if (cos1Adj == 0) {
                         cos1Adj -= angle == 0 ? textWidth / 4 : textWidth / 2;
                     }

                     var x1 = centerX + cos1Adj;
                     var y1 = centerY + sin1Adj * sin1Factor * -1;

                     svg.append("text")
                     .attr("class", "mtt-majorGraduationText")
                     .style("font", fontStyle)
                     .attr("text-align", "center")
                     .attr("x", x1)
                     .attr("dy", y1)
                     .attr("fill", majorGraduationTextColor)
                     .text(majorGraduationValues[i] + pValueUnit);
                 }
             };
             var renderGraduationNeedle = function (value, valueUnit, precision, minLimit, maxLimit) {
                 svg.selectAll('.mtt-graduation-needle').remove();
                 svg.selectAll('.mtt-graduationValueText').remove();
                 svg.selectAll('.mtt-graduation-needle-center').remove();
                 
                 var centerX = width / 2;
                 var centerY = width / 2;
                 var centerColor;

                 if (typeof value === 'undefined') {
                     centerColor = inactiveColor;
                 } else {
                     centerColor = needleColor;
                     var needleAngle = getNewAngle(value);
                     var needleLen = innerRadius - majorGraduationLength - majorGraduationMarginTop;
                     var needleRadius = (width * 2.5) / 300;
                     var textSize = isNaN(needleValueTextSize) ? (width * 12) / 150 : needleValueTextSize;
                     var fontStyle = textSize + "px Courier";

                     if (value >= minLimit && value <= maxLimit) {
                         var lineData = [
                            [needleRadius, 0],
                            [0, -needleLen],
                            [-needleRadius, 0],
                            [needleRadius, 0]
                         ];
                         var pointerLine = d3.svg.line().interpolate('monotone');
                         var pg = svg.append('g').data([lineData])
                                     .attr('class', 'mtt-graduation-needle')
                                     .style("fill", needleColor)
                                     .attr('transform', 'translate(' + centerX + ',' + centerY + ')');
                         needle = pg.append('path')
                                    .attr('d', pointerLine)
                                    .attr('transform', 'rotate('+needleAngle+')');
                     }

                     svg.append("text")
                         .attr("x", centerX)
                         .attr("y", centerY + valueVerticalOffset)
                         .attr("class", "mtt-graduationValueText")
                         .attr("fill", needleColor)
                         .attr("text-anchor", "middle")
                         .attr("font-weight", "bold")
                         .style("font", fontStyle)
                         .text('[ ' + value.toFixed(precision) + valueUnit + ' ]');
                 }

                 var circleRadius = (width * 6) / 300;

                 svg.append("circle")
                   .attr("r", circleRadius)
                   .attr("cy", centerX)
                   .attr("cx", centerY)
                   .attr("fill", centerColor)
                   .attr("class", "mtt-graduation-needle-center");
             };
             $window.onresize = function () {
                 scope.$apply();
             };
             scope.$watch(function () {
                 return angular.element($window)[0].innerWidth;
             }, function () {
                 scope.render();
             });
             scope.$watchCollection('[ranges, data.ranges]', function () {
                 scope.render();
             }, true);


             scope.render = function () {
                 updateInternalData();
                 svg.selectAll('*').remove();
                 if (renderTimeout) clearTimeout(renderTimeout);

                 renderTimeout = $timeout(function () {
                     var d3DataSource = [];

                     if (typeof ranges === 'undefined') {
                         d3DataSource.push([minLimit, maxLimit, inactiveColor]);
                     } else {
                         //Data Generation
                         ranges.forEach(function (pValue, index) {
                             d3DataSource.push([pValue.min, pValue.max, pValue.color]);
                         });
                     }

                     //Render Gauge Color Area
                     var translate = "translate(" + width / 2 + "," + width / 2 + ")";
                     var cScale = d3.scale.linear().domain([minLimit, maxLimit]).range([-1 * gaugeAngle * (Math.PI / 180), gaugeAngle * (Math.PI / 180)]);
                     var arc = d3.svg.arc()
                         .innerRadius(innerRadius)
                         .outerRadius(outerRadius)
                         .startAngle(function (d) { return cScale(d[0]); })
                         .endAngle(function (d) { return cScale(d[1]); });
                     svg.selectAll("path")
                         .data(d3DataSource)
                         .enter()
                         .append("path")
                         .attr("d", arc)
                         .style("fill", function (d) { return d[2]; })
                         .attr("transform", translate);

                     var majorGraduationsAngles = getMajorGraduationAngles();
                     var majorGraduationValues = getMajorGraduationValues(minLimit, maxLimit, majorGraduationPrecision);
                     renderMajorGraduations(majorGraduationsAngles);
                     renderMajorGraduationTexts(majorGraduationsAngles, majorGraduationValues, valueUnit);
                     renderGraduationNeedle(value, valueUnit, precision, minLimit, maxLimit);
                     initialized = true;
                 }, 200);

             };
             var onValueChanged = function(pValue, pPrecision, pValueUnit) {
                 if (typeof pValue === 'undefined' || pValue == null) return;
                 
                 if (needle && pValue >= minLimit && pValue <= maxLimit) {
                        var needleAngle = getNewAngle(pValue);
                        needle.transition()
                            .duration(transitionMs)
                            .ease('elastic')
                            .attr('transform', 'rotate('+needleAngle+')');
                        svg.selectAll('.mtt-graduationValueText')
                        .text('[ ' + pValue.toFixed(pPrecision) + pValueUnit + ' ]') ;
                    } else {
                        svg.selectAll('.mtt-graduation-needle').remove();
                        svg.selectAll('.mtt-graduationValueText').remove();
                        svg.selectAll('.mtt-graduation-needle-center').attr("fill", inactiveColor);
                    }
             };
             scope.$watchCollection('[value, data.value]', function () {
                 if (!initialized) return;
                 updateInternalData();
                 onValueChanged(value, precision, valueUnit);
             }, true);
         }
     };
 }]);
