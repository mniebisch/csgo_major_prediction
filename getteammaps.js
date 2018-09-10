// get all recent maps for a team id

const { HLTV } = require('hltv')


/*HLTV.getTeamStats({id: 7532}).then((res) => {
    console.log(res['matches'].length);
    //console.log(res);
    console.log(res['matches'][0]);
});*/

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

            if (key >= 2) {break;}
        }

    });

    return map_list;
}

var mauz = get_team_maps(7532);

mauz.then(function(result) {
    console.log(result);
})