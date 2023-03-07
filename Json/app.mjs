const songs = [
    {
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      year: 1975,
      chartPosition: 1
    },
    {
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      year: 1983,
      chartPosition: 2
    },
    {
      title: 'Imagine',
      artist: 'John Lennon',
      year: 1971,
      chartPosition: 3
    },
    {
      title: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      year: 1991,
      chartPosition: 4
    },
    {
      title: 'I Will Always Love You',
      artist: 'Whitney Houston',
      year: 1992,
      chartPosition: 5
    },
    {
        title: 'Smells Like  Spirit',
        artist: 'Nirvana',
        year: 1991,
        chartPosition: 6
      },
  ];


import express from 'express';
const app = express();  
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/time', (req, res) => {
    res.send(new Date().toLocaleTimeString())
});

app.get('/artist/:artistp', (req,res)=> {
    res.send(`Hello ${req.params.artistp}!`);
});

app.get('/artist/:artistName/song/:songTitle', (req, res) => {
    const artist = req.params.artistName;
    const song = req.params.songTitle;
    res.send(`The artist is ${artist} and the song is ${song}.`);
  });

  // excercise 5 
  app.get('/topSongs', (req, res) => {
    res.json(songs);
  });
  

app.listen(3000, () => console.log('Example app listening on port 3000!'));