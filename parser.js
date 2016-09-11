window.onload = function() {
var fileInput = document.getElementById('fileInput');
var fileDisplayArea = document.getElementById('fileDisplayArea');
//this function will convert csv string to json string.
function csvTojs(csv) {
  var lines=csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for(var i=1; i<lines.length; i++) {
    var obj = {};

    var row = lines[i],
      queryIdx = 0,
      startValueIdx = 0,
      idx = 0;

    if (row.trim() === '') { continue; }

    while (idx < row.length) {
      var c = row[idx];

      if (c === '"') {
        do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
      }

      if (c === ',' || idx === row.length - 1) {
        var value = row.substr(startValueIdx, idx - startValueIdx).trim();

        if (value[0] === '"') { value = value.substr(1); }
        if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
        if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }

        var key = headers[queryIdx++];
        obj[key] = value;
        startValueIdx = idx + 1;
      }

      ++idx;
    }

    result.push(obj);
  }
  return result;
}
//adding even after user upload the input file.
fileInput.addEventListener('change', function(e) {
	var file = fileInput.files[0];
	
		var reader = new FileReader();

		reader.onload = function(e) {
			
			var jsonOb = csvTojs(reader.result);
			
			var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonOb));
			var dlAnchorElem = document.getElementById('downloadAnchorElem');
			dlAnchorElem.setAttribute("href",     dataStr     );
			dlAnchorElem.setAttribute("download", "output.json");
			dlAnchorElem.click();
			//fileDisplayArea.innerText = csvTojs(reader.result);
		}

		reader.readAsText(file);	
	
});
}
