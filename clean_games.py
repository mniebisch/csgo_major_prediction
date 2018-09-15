
# coding: utf-8

import pandas as pd

df = pd.read_csv("data/major_team_history.csv")
df["score_team1"] = df.result.apply(lambda x: x.split("-")[0].strip())
df["score_team2"] = df.result.apply(lambda x: x.split("-")[1].strip())

last_year = df[df.date > 1504224000000]
#games with only one major attending team
last_year_bad_opp = last_year[~last_year["team2"].isin(last_year.team1.value_counts().index)]

#games with both teams attending the major
major_team_games = last_year[last_year["team2"].isin(last_year.team1.value_counts().index)]
used_teams = []
games = []

for team in last_year.team1.value_counts().index:
    for row in major_team_games[major_team_games["team1"]==team].iterrows():
        if row[1][2] in used_teams:
            pass
        else:
            games.append([row[1][i] for i in range(7)])
    used_teams.append(team)

mtg_dict = {k:[g[j] for g in games] for j, k in enumerate(df.columns)}


#combine both dicts
pd.concat([last_year_bad_opp,pd.DataFrame(mtg_dict)]).to_csv("data/cleaned_games.csv", index=False)

