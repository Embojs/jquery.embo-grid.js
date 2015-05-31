( function($) {
	var gridRowDivTemplate = 
	'<div id="{{RowId}}" class="{{CssClass}}">' +
	'</div>';
	
	var defaultTemplate = 
	'<div>' +
	'<h1>{{Title}}</h1>' +
	'<div>{{Image}}</div>' +
	'<p>{{Description}}</p>' +
	'<div>{{Button}}</div>' +
	'</div>';
	
	var defaultGridRowData = {
					Id : null,
					Title: "",
					Image: {
						Url: "",
						Height: "100px",
						Width: ""
					},
					Description: "",
					CssClass: "",
					Button: [{
						Text: "",
						Url: "",
						CssClass = ""
					}]
				}
				
	$.fn.embo = function(options){
		var settings = $.extend({
			template = defaultTemplate,
			data: null,
			complete: completed,
			fail: failed,
			end: ended
		}, options);
		return this.each(function(){
			try{
				var container = this;
				
				if (settings.data.rows)
				{
					var gridData = settings.data.rows;
					gridData.each{
						var rowData = $.extend(defaultGridRowData, this);
						var row = applyRowDataToTemplate(settings.template, data);
						$(container).append(row);
					}
				}
				
				if ($.isFunction(settings.complete)) {
					settings.complete.call();
				}
			}
			catch(ex)
			{
				if ($.isFunction(settings.fail)) {
					settings.fail.call(ex);
				}
			}
			finally {
			  if ($.isFunction(settings.end)) {
					settings.end.call();
				}
			}
		});
		
	}
	
	var applyRowDataToTemplate = function (template, data){}
	
	var completed = function() {}
	
	var failed = function(ex) {
		console.log("Something went wrong: " + ex);
	}
	
	var ended = function() {}
	
}(jQuery));