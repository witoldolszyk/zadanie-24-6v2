import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import PlayersList from './components/PlayerList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';

it('renders without crashing', () => {
  shallow(<App />);
});

it("should update player score", () => {
  const appComponent = shallow(<App />);
  const players = [{
    name: 'Kunegunda',
    score: 5
  }]

  appComponent.setState({ players });

  const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');
  onScoreUpdate(0, 5);

  const playersAfterUpdate = appComponent.state().players;

  expect(playersAfterUpdate[0].score).toEqual(10);
});

it('check player name, new player score and numbers of players', () => {
  const appComponent = shallow(<App />);

  const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
  onPlayerAdd('Ania');

  const players = appComponent.state('players');

  expect(players.length).toEqual(1);
  expect(players[0].name).toEqual('Ania');
  expect(players[0].score).toEqual(0);
});

it('check numbers of players after remove one', () => {
  const appComponent = mount(<App />);
  //console.log(appComponent.debug());

  const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
  onPlayerAdd('Jan');
  onPlayerAdd('Katarzyna');

  const onPlayerRemove = appComponent.find(PlayersList).prop('onPlayerRemove');
  onPlayerRemove('Jan');

  const players = appComponent.state('players');

  expect(players.length).toEqual(1);
});
