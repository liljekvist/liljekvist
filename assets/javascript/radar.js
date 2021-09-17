(function($) {
    
    var Radar = (function() {
      
      function Radar(ele, settings) {
        this.ele = ele;
        this.settings = $.extend({
          showAxisLabels: false,
          title: "Untitled",
          step: 1,
          size: [300,300],
          values: {},
          color: [0,157,255]
        },settings);
        this.width = settings.size[0];
        this.height = settings.size[1];
        $(ele).css({
          'position': 'relative',
          'width': this.width,
          'height': this.height
        });
        this.canvases = {};
        this.draw();
      }
      
      Radar.prototype.newCanvas = function(name, delay) {
        var delay = delay || 0;
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        $(canvas).css({
          'position': 'absolute'
        });
        this.canvases[name] = canvas;
        this.ele.appendChild(canvas);
        this.cxt = canvas.getContext('2d');
        if (delay != 0) {
          $(canvas).css('opacity',0).delay(delay).animate({opacity: 1}, 500);
        }
      }
      
      Radar.prototype.draw = function() {
        this.newCanvas('axis', 100);
        var min = 0;
        var max = 0;
        
        $.each(this.settings.values, function(i,val){
          if (val < min)
            min = val;
          if (val > max)
            max = val;
        });
        
        min = Math.floor(min);
        max = Math.ceil(max);
  
        var spacing = 20;
        
        for(var i = min; i <= max; i += this.settings.step) {
          this.cxt.beginPath();
          this.cxt.arc(this.width/2,
                       this.height/2,
                       this.settings.step * spacing * i,
                       0, 2 * Math.PI, false);
          this.cxt.strokeStyle = "#424242";
          this.cxt.fillStyle = "#424242";
          this.cxt.stroke();
          if (this.settings.showAxisLabels)
            this.cxt.fillText(i,this.width/2 + this.settings.step * spacing * i+4, this.height/2-2);
        }
        
        var size = 0;
        for(var key in this.settings.values)
          size += 1;
        
        for(var i = 0; i < size; i += 1) {
          this.cxt.beginPath();
          this.cxt.moveTo(this.width / 2, this.height /2);
          var x = this.width / 2 + Math.cos((Math.PI * 2) * (i / size)) * spacing * max;
          var y = this.height /2 + Math.sin((Math.PI * 2) * (i / size)) * spacing * max;
          this.cxt.fillStyle = "#424242";
          this.cxt.strokeStyle = "#424242";
          this.cxt.lineTo(x, y);
          this.cxt.stroke();
        }
        
        this.newCanvas('part',200);
        
        this.cxt.beginPath();
        var first = true;
        var i = 0;
        var that = this;
        var end = {x: null, y: null};
        $.each(this.settings.values, function(key,val){
          var x = that.width / 2 + Math.cos((Math.PI * 2) * (i / size)) * spacing * val;
          var y = that.height / 2 + Math.sin((Math.PI * 2) * (i / size)) * spacing * val;
          if (first) {
            that.cxt.moveTo(x, y);
            end.x = x;
            end.y = y;
            first = false;
          }
          that.cxt.lineTo(x, y);
          i += 1;
        });
        
        this.cxt.lineTo(end.x, end.y);
        var grad = this.cxt.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0,"rgba("+this.settings.color[0]+","+this.settings.color[1]+","+this.settings.color[2]+",0)");
        grad.addColorStop(1,"rgba("+this.settings.color[0]+","+this.settings.color[1]+","+this.settings.color[2]+",1)");
        this.cxt.fillStyle = grad;
        this.cxt.shadowBlur = 2;
        this.cxt.shadowColor = "rgba(195, 196, 202, 1)";
        this.cxt.stroke();
        this.cxt.fill();
        
        this.newCanvas('labels',1000);
        
        i = 0;
        $.each(this.settings.values, function(key,val){
          that.newCanvas('label-'+i, i * 250);
          that.cxt.fillStyle = "rgba(195,196,202,0.8)";
          that.cxt.strokeStyle = "rgba(195,196,202,0.8)";
          that.cxt.font = "bold 12px Poppins";
          var dist = Math.min(spacing * val, size * spacing);
          var x = that.width / 2 + Math.cos((Math.PI * 2) * (i / size)) * spacing * val;
          var y = that.height / 2 + Math.sin((Math.PI * 2) * (i / size)) * spacing * val;
  
          var textX = that.width / 2 + Math.cos((Math.PI * 2) * (i / size)) * spacing * val;
          var textY = that.height / 2 + Math.sin((Math.PI * 2) * (i / size)) * spacing * val * 1.5;
          
          if (textX < that.width/2) {
            textX -= 75
            that.cxt.textAlign="end";
            that.cxt.beginPath();
            var width = that.cxt.measureText(key).width;
            that.cxt.moveTo(textX - width - 5, textY + 4);
            that.cxt.lineTo(textX + 15, textY + 4);
            that.cxt.lineTo(x - 2, y);
            that.cxt.lineWidth = 2;
            that.cxt.stroke();
          } else {
            textX += 75
            that.cxt.textAlign="start";
            that.cxt.beginPath();
            var width = that.cxt.measureText(key).width;
            that.cxt.moveTo(x + 2,y);
            that.cxt.lineTo(textX - 15, textY + 4);
            that.cxt.lineTo(textX + width + 5, textY + 4);
            that.cxt.lineWidth = 2;
            that.cxt.stroke();
          }
          that.cxt.fillText(key, textX, textY);
          //For arrows that aren't done.
          i += 1;
        });
        
        
        this.newCanvas('title',1000);
        this.cxt.font = "bold 24px Poppins";
        this.cxt.fillText(this.settings.title, 10, 30); 
      }
      
      return Radar;
      
    })();
    
    $.fn.radarChart = function(settings){
      this.each(function(i,ele){
        var radar = new Radar(ele, settings);
      });
    }

    $('#chart').radarChart({
      size: [600, 300],
      step: 1,
      title: "",
      values: {
        "C++": 6.5,
        "Cmake": 4.0,
        "C": 3.5,
        "JavaScript": 3.0,
        "jQuery": 2.5,
        "HTML": 3.0,
        "CSS": 2.4,
        "PHP": 2,
        "vimscript": 2.5,
        "MariaDB/MYSQL": 3.5,
        "Problem Solving": 4,
      },
      showAxisLabels: true
    });
    
  })(jQuery);