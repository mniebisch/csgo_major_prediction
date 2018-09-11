const { HLTV } = require('hltv')


/*HLTV.getEvent({id: 3885}).then((res) => {
    console.log(res['teams']);

    for 
});*/

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

var mauz = get_major_teams();

mauz.then(function(result) {
    console.log(result);
})