$(document).ready(function(){
(function($){
  $.fn.labeledSlider = function(labels, params) {

    var options = {
      ticks   : false,
      display : function(){},
      stop    : function(){},
    };

    $.extend( options, params );

    var min = 0;
    var max = 1000;

    var total = labels.length;
    var step = max/(total-1);

    var value_label_map = {};
    for(a=0;a<total;a++) {
      var val = parseFloat((a*step).toFixed(5));
      value_label_map[val] = labels[a];
    }

    return this.slider({
      range: true,
      values: [min, max],
      min: min,
      max: max,
      step: step,
      slide: function(event, ui) {
        var o = options;
        var t = $(event.target);
        var map = t.data('value_label_map');
        if (ui.values[0] != ui.values[1]) {
          var lb = [map[ui.values[0]], map[ui.values[1]]];
          t.data('labels', lb);
          ui.labels = lb;
          o.display(event, ui);
          return true;
        } else {
          return false;
        }
      },

      create: function(event, ui) {
        var o = options;
        var vlm = value_label_map;
        var t = $(event.target);
        t.data('value_label_map', vlm);
        if (o.ticks) {
          var ticks = $('<div class="ticks">');
          for (i=0;i<total;i++) {
            var tick = $('<span class="tick">');
            tick.css({left: step/10*i+'%'});
            ticks.append(tick);
          }
          t.append(ticks);
        }
        ui.values = [min, max]
        var lb = [vlm[ui.values[0]], vlm[ui.values[1]]];
        t.data('labels', lb);
        ui.labels = lb;
        o.display(event, ui);
      },

      stop: function(event, ui) {
        var o = options;
        var t = $(event.target);
        ui.labels = t.data('labels');
        o.stop(event, ui);
      }
    });
  };
})(jQuery);
})
