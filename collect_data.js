const { HLTV } = require('hltv')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/*const csvWriter = createCsvWriter({
  path: './data/file.csv',
  header: [
      {id: 'name', title: 'team_name'},
      {id: 'id', title: 'team_id'},
      {id: 'points', title: 'points'},
      {id: 'place', title: 'place'},
      {id: 'change', title: 'change'},
      {id: 'isNew', title: 'isNew'}
  ]
});*/

const csvWriter = createCsvWriter({
    path: './data/file2.csv',
    header: [
        'name',
        'id',
        'points',
        'place',
        'change',
        'isNew'
    ]
  });


Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };


/*var f = new Date(2017, 0, 2);
console.log(f);
console.log(f.getFullYear());
console.log(f.getMonth());
console.log(f.getDate());
f.setDate(f.getDate() + 7);
console.log(f);
console.log(f.getFullYear());
console.log(f.getMonth());
console.log(f.getDate());
console.log(f.yyyymmdd());


var ff = new Date(2017, 0, 20);
console.log(f > ff);

var i = 0;

while (i < 4) {
    console.log(i);
    i++;
};
*/

HLTV.getTeamRanking({year: '2017', month: 'may', day: '29'}).then((res) => {
    console.time("dbsave");
    
    var team_list = [];

    res.forEach(function(value) {
        var team_entry = {};
    
        for (var key in value) {
            team_entry[key] = value[key];
            if (key == 'team') {
                const team = value[key];
                for (var team_key in team) {
                    team_entry[team_key] = team[team_key];
                };
            };
        };
        
        team_list.push(team_entry);
    }); 

    csvWriter.writeRecords(team_list)
    .then(() => {
        console.log('...Done');
    });

    console.timeEnd("dbsave");
    


});



//console.log(team_list);