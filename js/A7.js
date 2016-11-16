/*

   Name:              David Bui
   Email address:     David_Bui@student.uml.edu
   Affiliation:       Student at UMass Lowell in course COMP 4610 GUI Programming I
   Date file created: November 10, 2016
   Short Description: This is the JavaScript file for my assignment. It does all of
                      the calculations necessary to get the input, calculate the
                      output, and then physically display it on screen in a table.

*/

$(document).ready(function() {

    $.validator.addMethod("greaterThan",
			  function(value, element, param) {
			      var $min = $(param);

			      if (this.settings.onfocusout) {
				  $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function() {
				      $(element).valid();
				  });
			      }

			      return parseInt(value) > parseInt($min.val());
			  }, "The maximum value has to be greater than the minimum value.");

    $.validator.addMethod("lessThan",
			  function(value, element, param) {
			      var $max = $(param);

			      if (this.settings.onfocusout) {
				  $max.off(".validate-lessThan").on("blur.validate-lessThan", function() {
				      $(element).valid();
				  });
			      }

			      return parseInt(value) < parseInt($max.val());
			  }, "The minimum value has to be less than the maximum value.");

    $('#input').validate({
        rules: {
            rowMins: {
		required: true,
		range: [-100, 100],
		lessThan: '#rowMaxs'
            },
            rowMaxs: {
		required: true,
		range: [-100, 100],
		greaterThan: "#rowMins"
            },
            columnMins: {
		required: true,
		range: [-100, 100],
		lessThan: '#columnMaxs'
            },
            columnMaxs: {
		required: true,
		range: [-100, 100],
		greaterThan: '#columnMins'
            }
        },

        messages: {
            rowMins: {
		required: "Please enter a min row value.",
		lessThan: "Row Min must be smaller than Row Max."
            },
            rowMaxs: {
		required: "Please enter a max row value.",
		greaterThan: "Row Max must be greater than Row Min."
            },
            columnMins: {
		required: "Please enter a min column value.",
		lessThan: "Column Min must be smaller than Column Max."
            },
            columnMaxs: {
		required: "Please enter a max column value.",
		greaterThan: "Column Max must be greater than Column Min."
            }
        }
    });

    $.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

	return results[1] || 0;
    }
        
    var rowMinimums = parseInt(($.urlParam('rowMins') !== null ? $.urlParam('rowMins') : 0));
    var rowMaximums = parseInt(($.urlParam('rowMaxs') !== null ? $.urlParam('rowMaxs') : 1));
    var columnMinimums = parseInt(($.urlParam('columnMins') !== null ? $.urlParam('columnMins') : 0));
    var columnMaximums = parseInt(($.urlParam('columnMaxs') !== null ? $.urlParam('columnMaxs') : 1));

    $('#rowMins').val(rowMinimums);
    $('#rowMaxs').val(rowMaximums);
    $('#columnMins').val(columnMinimums);
    $('#columnMaxs').val(columnMaximums);

    $("#placeholder").empty();

    var rowCount = rowMaximums - rowMinimums;
    var columnCount = columnMaximums - columnMinimums;

    var multipliers = new Array();
    var multiplicands = new Array();

    for (rowMinimums; rowMinimums <= rowMaximums; rowMinimums++) {
        multiplicands.push(rowMinimums);
    }

    for (columnMinimums; columnMinimums <= columnMaximums; columnMinimums++) {
        multipliers.push(columnMinimums);
    }

    var tableMake = "";
    tableMake += "<table>";
        
    for (var row = 0; row <= (rowCount + 1); row++) {
        tableMake += "<tr>";

        for (var column = 0; column <= (columnCount + 1); column++) {
            if (row == 0 && column == 0) {
                tableMake += "<td class='empty'>" + "" + "</td>";
            } else if (row == 0 && column > 0) {
                tableMake += "<td class='firstRow'>" + multipliers[column - 1] + "</td>";
            } else if (column == 0 && row > 0) {
                tableMake += "<td class='firstColumn'>" + multiplicands[row - 1] + "</td>";
            } else {
                tableMake += "<td class='middle'>" + (multipliers[column - 1] * multiplicands[row - 1]) + "</td>";
            }
        }
        tableMake += "</tr>";
    }

    tableMake += "</table>";
        
    $('#table').html(tableMake);
});
