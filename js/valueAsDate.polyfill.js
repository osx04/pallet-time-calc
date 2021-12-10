if(!("valueAsDate" in HTMLInputElement.prototype)){
    Object.defineProperty(HTMLInputElement.prototype, "valueAsDate", {
      get: function(){
        var d = this.value.split(/\D/);
        return new Date(d[0], --d[1], d[2]);
      },
      set: function(d){
        var day = ("0" + d.getDate()).slice(-2),
            month = ("0" + (d.getMonth() + 1)).slice(-2),
            datestr = d.getFullYear()+"-"+month+"-"+day;
        this.value = datestr;
      }
    });
}

// test & demo: http://jsbin.com/wumikawero/1/edit?html,js,output