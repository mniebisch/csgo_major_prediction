const { HLTV } = require('hltv')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: './data/major_team_history.csv',
    header: [
        {id: 'dateApproximate', title: 'date'},
        {id: 'team1', title: 'team1'},
        {id: 'team2', title: 'team2'},
        {id: 'map', title: 'map'},
        {id: 'result', title: 'result'}
    ]
  });

async function get_major_teams() {
    var result = [];
    await HLTV.getEvent({id: 3564}).then((res) => {
        var teams = res['teams'];
        for (key in teams) {
            if (teams[key]['id'] == 9215) {
                result.push(6137);
            };
            if (teams[key]['id'] == 9183) {
                result.push(7467);
            };
            result.push(teams[key]['id']);
        }
    });

    return result;
}

async function get_team_maps(id) {
    var map_list = [];
    await HLTV.getTeamStats({id: id}).then((res) => {
        var maps = res['matches'];
        for (key in maps) {

            var match = {};
            match['dateApproximate'] = maps[key]['dateApproximate'];
            match['team1'] = id;
            match['team2'] = maps[key]['enemyTeam']['id'];
            match['map'] = maps[key]['map'];
            match['result'] = maps[key]['result'];

            map_list.push(match);
        }

    });

    return map_list;
}

async function get_major_team_history() {
    var team_ids = await get_major_teams();

    const csvPromises = team_ids.map(async team_id => {
        const response = await get_team_maps(team_id);
        return response;
    })

    var major_team_history = [];

    for (const map_list of csvPromises) {
        await map_list.then(function(result) {
            for (const map_i of result) {
                major_team_history.push(map_i);
            }
        })
    };

    //console.log(major_team_history)

    csvWriter.writeRecords(major_team_history)
    .then(() => {
        console.log('...Done');
    });
}

get_major_team_history();