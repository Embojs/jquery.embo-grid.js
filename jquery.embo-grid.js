(function($) {
	var gridRowDivTemplate = 
	'<div id="{{RowId}}" class="{{CssClass}}">' +
	'</div>';
	
	var defaultTemplate = 
	'<div id="{{Id}}">' +
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
						alt:"",
						title: "",
						Height: "",
						Width: ""
					},
					Description: "",
					CssClass: "",
					Button: {
						Template : "{{1}}",
						1:{
						Template: "",
						Text: "",
						Url: "",
						CssClass : ""
					}
					}
				};
		
	var EmboCore = {
		Messages: {
			error : "Something went wrong :"
		},
		completed: function (){
			
		},
		failed: function (ex) {
			EmboCore.showMessage('error', EmboCore.Messages.error + ex);
		},
		ended : function () {
			
		},
		showMessage : function (type, message){
			console.log(message);
		}
		
	}
	
	var EmboGridCore = {
		drawGrid : function (gridContainer, template, data) {
			$.each(data, function(key, rowdata) {
				$(gridContainer).append(
				EmboGridCore.repeater(template, rowdata)
				);
				
			});
		},
		repeater: function (template, data) {
			
			var row = template;
			
			$.each(data, function (key, value)
			{
				var keyString = '{{'+ key +'}}';
				
				if (typeof value == 'object') {
					var objectTemplate = "";
					
					if (value.Template){
						objectTemplate = value.Template;
					}
					row = row.replace(keyString, EmboGridCore.repeater(objectTemplate, value));
					
				} else {
					row = row.replace(keyString, value);
				}
			});
			EmboCore.showMessage(row);
			return row;
		}
	}
	
    $.fn.emboGrid = function(options) {
		var settings = $.extend({
			   template : defaultTemplate,
			   data: null, 
			   completed: EmboCore.completed,
			   failed: EmboCore.failed,
			   ended: EmboCore.ended
		   }, options);
		   console.log(settings.data);
		return this.each(function(){
			
				var gridContainer = this;
				
				EmboGridCore.drawGrid(gridContainer, settings.template, settings.data);
				if ($.isFunction(settings.completed)) {
					settings.completed.call(this);
				}
			
			try{}
			catch(ex)
			{
				if ($.isFunction(settings.failed)) {
					settings.failed.call(ex);
				}
			}
			finally {
			  if ($.isFunction(settings.ended)) {
					settings.ended.call(this);
				}
			}
			
		});
		
    }
	
}(jQuery));