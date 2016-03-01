Theme.TriggerEvents = (function($) {
  // Trigger events handles all those document clicks that could
  // fire some event. Eg - closing a menu by clicking on the document
  
  // An array of events
  var events = [];
  
  // Add an event
  function add(id, targets, callback) {
    // The target for the event, convert to array
    targets = Array.isArray(name) ? targets : [targets];

    // Put inside events
    events.push({
      id: id,
      targets: targets,
      callback: callback
    });
  }

  // Remove an event
  function remove(id) {
    var index = -1;
  
    // Find the event
    for (var i=0; i < events.length; i++) {
      if(events[i].id == id){
        index = i;
      }
    };
  
    if(index > -1){
      events.pop(index);
    } else {
      throw "error, could not find event";
    }
  }

  function happen(event) {
    // Loop through each event and compare
    for (var i=0; i < events.length; i++) {
      
      var _event = events[i];
      
      // To let the event go through or not
      var cancel = false;
      
      // Loop through each target and compare
      for (var j=0; j < _event.targets.length; j++) {
        var target = _event.targets[j];
        
        if($(event.target).closest(target).is(target)){
          cancel = true;
        }
      };
      
      // If the event isn't canceled, run the callback
      if(!cancel){
        _event.callback();
      }
      
    };
  }
  
  // Assign document click events
  $(document).mousedown(happen);
  $(document).bind('touchend', happen);
  
  // Public methods
  return {
    // Add an event
    add: add,
    
    // Remove an event
    remove: remove,
    
    // Gets the list of events
    all: events
  }
})(Theme.jQuery);