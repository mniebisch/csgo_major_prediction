const { HLTV } = require('hltv')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: './data/file.csv',
  header: [
      {id: 'name', title: 'team_name'},
      {id: 'id', title: 'team_id'},
      {id: 'points', title: 'points'},
      {id: 'place', title: 'place'},
      {id: 'change', title: 'change'},
      {id: 'isNew', title: 'isNew'}
  ]
});

HLTV.getTeamRanking().then((res) => {
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
})