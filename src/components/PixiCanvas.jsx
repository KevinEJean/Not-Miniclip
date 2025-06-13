import * as PIXI from 'pixi.js';
import React from 'react';
import startTranslations from './util/other/Translations.jsx';
import './menu/MainMenu.css';
import Container from './menu/Container.jsx';
import showJumpscare from './util/navbar/Jumpscare.jsx';

/*

###################################### TO DO ######################################

- rate updating per kill (works but not how i tought it would?)
- fix sounds

*/

const PixiCanvas = ({ castContext, characterSkin }) => {

  // useRef
  const canvasRef = React.useRef(null);
  const pixiAppRef = React.useRef(null);
  const characterSpriteRef = React.useRef(null);
  const bulletsRef = React.useRef([]);
  const lineRef = React.useRef(null);
  // autre
  const [isClickedGame1, setIsClickedGame1] = React.useState(false);
  const [isClickedGame2, setIsClickedGame2] = React.useState(false);
  const [isClickedGame3, setIsClickedGame3] = React.useState(false);
  const [isClickedGame4, setIsClickedGame4] = React.useState(false);
  const [startText, setStartText] = React.useState('Start');
  const [score, setScore] = React.useState(0);
  // personage
  const [userPosY, setUserPosY] = React.useState(320);
  const userPosX = 40;
  // balle
  const [bulletSpeed, setBulletSpeed] = React.useState(2);
  const [canShoot, setCanShoot] = React.useState(true);
  const shootSound = new Audio('/sounds/shoot.mp3');
  // enemie
  const [enemies, setEnemies] = React.useState([]);
  const [enemySpeed, setEnemySpeed] = React.useState(2);
  const [spawnRate, setSpawnRate] = React.useState(3250);
  // statut du jeux
  const [gameStart, setGameStart] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const gameOverSound = new Audio('/sounds/gameOver.mp3');
  // map
  const numberOfTrees = (Math.random() * 10) + 5;   // 'Spawn rate' des arbres
  const numberOfChampi = (Math.random() * 20) + 10; // 'Spawn rate' des champignons
  const numberOfGrass = (Math.random() * 15) + 5;   // 'Spawn rate' des herbres
  const linePosX = 80;
  const linePosY = 0;



  /* ###################################### LOGIQUE DU JEUX (frame by frame) ###################################### */

  const handleStartGame = () => {
    const app = pixiAppRef.current;
    setGameStart(true);
    setScore(0);
    var tempSpeedFix = enemySpeed;
    var tempSpawnFix = spawnRate;

    // Personnage
    PIXI.Assets.load(characterSkin).then((texture) => {
      const app = pixiAppRef.current;
      const character = new PIXI.Sprite(texture);
      character.anchor.set(0.5);
      character.x = userPosX;
      character.y = userPosY;
      character.scale.set(0.1);
      characterSpriteRef.current = character;
      app.stage.addChild(character);
    });

    // Ennemis
    const spawnEnemy = () => {
      const enemy = new PIXI.Graphics();
      enemy.beginFill(0xff0000);
      enemy.drawRect(1085, randomPositionGenerator(0, 0, 670, 0).y, 50, 50);
      enemy.endFill();

      setEnemies((prevEnemies) => {
        app.stage.addChild(enemy);
        return [...prevEnemies, enemy];
      });
    };

    // 'Spawn rate' des enemies
    const enemySpawnInterval = setInterval(() => {
      spawnEnemy();
    }, tempSpawnFix);

    // Ligne
    const line = new PIXI.Graphics();
    line.beginFill(0xffffff);
    line.drawRect(linePosX, linePosY, 10, 1080)
    line.endFill();
    lineRef.current = line;
    app.stage.addChild(line);




    // Game Loop
    app.ticker.add(() => {

      bulletsRef.current = bulletsRef.current.filter((bullet) => {
        bullet.x += bulletSpeed;
        if (bullet.x > 1080) {
          app.stage.removeChild(bullet);
          return false;
        }
        return true;
      });

      setEnemies((prevEnemies) => {
        return prevEnemies.filter((enemy) => {
          let isHit = false;

          if (bulletsRef.current.length != 0) {
            bulletsRef.current.forEach((bullet, index) => {
              const enemyBounds = enemy.getBounds();
              const bulletBounds = bullet.getBounds();

              const isCollidingWithBullet =
                bulletBounds.x < enemyBounds.x + enemyBounds.width &&
                bulletBounds.x + bulletBounds.width > enemyBounds.x &&
                bulletBounds.y < enemyBounds.y + enemyBounds.height &&
                bulletBounds.y + bulletBounds.height > enemyBounds.y;

              if (isCollidingWithBullet) {
                pixiAppRef.current.stage.removeChild(bullet);
                pixiAppRef.current.stage.removeChild(enemy);
                bulletsRef.current.splice(index, 1);
                isHit = true;

                // Augmenté le score et la difficulté
                setScore((prevScore) => {
                  const newScore = prevScore + 5;

                  if (newScore % 5 === 0) {
                    tempSpeedFix += 0.5;
                    if (tempSpawnFix > 500) {
                      tempSpawnFix -= 250;
                    }
                  }

                  return newScore;
                });
              }
            });
          }

          if (isHit) {
            return false;
          }

          const enemyBounds = enemy.getBounds();
          const lineBounds = lineRef.current.getBounds();

          const isCollidingWithLine =
            enemyBounds.x < lineBounds.x + lineBounds.width &&
            enemyBounds.x + enemyBounds.width > lineBounds.x &&
            enemyBounds.y < lineBounds.y + lineBounds.height &&
            enemyBounds.y + enemyBounds.height > lineBounds.y;

          if (isCollidingWithLine) {
            pixiAppRef.current.stage.removeChild(enemy);
            pixiAppRef.current.ticker.stop();
            // showJumpscare(true);
            setGameOver(true);
            setEnemySpeed(0);
            clearInterval(enemySpawnInterval);
            // gameOverSound.play();
            return false;
          }

          enemy.x -= tempSpeedFix;
          return true;
        });
      });
    });
  }

  // Balle (bullet)
  const handleShoot = () => {
    const app = pixiAppRef.current;
    const character = characterSpriteRef.current;

    if (!character.current && canShoot) {
      const bullet = new PIXI.Graphics();
      bullet.beginFill(0xffffff);
      bullet.drawCircle(0, 0, 5);
      bullet.endFill();
      bullet.x = character.x + 20;
      bullet.y = character.y + 20;
      bulletsRef.current.push(bullet);
      app.stage.addChild(bullet);

      // shootSound.play();
      setCanShoot(false);
      setTimeout(() => setCanShoot(true), 600); // Cooldown
    }
  };



  /* ###################################### LOGIQUE MÉTIERS ###################################### */

  // Génère une position (x, y) aléatoire entre des valeurs max/min
  const randomPositionGenerator = (maxX, minX, maxY, minY) => {
    const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
    const randomY = Math.floor(Math.random() * (maxY - minY) + minY);
    return { x: randomX, y: randomY };
  };

  // Redémarrer la partie
  const handleRestartGame = () => {
    const app = pixiAppRef.current;

    setEnemies((prevEnemies) => {
      prevEnemies.forEach((enemy) => {
        app.stage.removeChild(enemy);
      });
      return [];
    });

    app.stage.removeChild(characterSpriteRef.current);
    bulletsRef.current.forEach((bullet) => {
      app.stage.removeChild(bullet);
      bulletsRef.current = [];
    })

    setGameOver(false);
    setEnemySpeed(2);
    app.ticker.start();
    handleStartGame();
  };

  // Quiter la partie (retourner au menu)
  const quit = () => {
    window.location.reload();
  }



  /* ###################################### USE EFFECT ###################################### */

  // Initialise l'applcation et la map
  React.useEffect(() => {
    const app = new PIXI.Application({
      view: canvasRef.current,
      width: 1080,
      height: 720,
      backgroundAlpha: 0
    });

    pixiAppRef.current = app;

    // Champignon
    PIXI.Assets.load('/champi.png').then((texture) => {
      for (let i = 0; i < numberOfChampi; i++) {
        const position = randomPositionGenerator(1125, 80, 770, 70);
        const champignon = new PIXI.Sprite(texture);
        champignon.anchor.set(3);
        champignon.x = position.x; // max.X = 1125, min.X = 80
        champignon.y = position.y; // max.Y = 770, min.Y = 70
        champignon.scale.set(0.18);
        app.stage.addChild(champignon);
      }
    });

    // Arbres
    PIXI.Assets.load('/pixelTrees.png').then((texture) => {
      for (let i = 0; i < numberOfTrees; i++) {
        const position = randomPositionGenerator(1080, 200, 730, 100);
        const tree = new PIXI.Sprite(texture);
        tree.anchor.set(1);
        tree.x = position.x; // max.X = 1080, min.X = 200
        tree.y = position.y; // max.Y = 730, min.Y = 100
        tree.scale.set(0.05);
        app.stage.addChild(tree);
      }
    });

    // Gazon
    PIXI.Assets.load('/pixelGrass.png').then((texture) => {
      for (let i = 0; i < numberOfGrass; i++) {
        const position = randomPositionGenerator(1080, 40, 735, 25);
        const grass = new PIXI.Sprite(texture);
        grass.anchor.set(1);
        grass.x = position.x; // max.X = 1080, min.X = 40
        grass.y = position.y; // max.Y = 735, min.Y = 25
        grass.scale.set(0.05);
        app.stage.addChild(grass);
      }
    });

    return () => {
      app.destroy(true, true);
    };
  }, []);

  // Change le texte 'start' à chaque interval
  React.useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setStartText(startTranslations[index]);
      index = (index + 1) % startTranslations.length;
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Contrôle du jeux
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      const user = characterSpriteRef.current;
      switch (event.key) {
        case 'w':
          user.y = Math.max(user.y - 15, 0);
          break;
        case 's':
          user.y = Math.min(user.y + 15, 690);
          break;
        case 'Enter':
          handleShoot();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleShoot]);

  // Recois action du controlleur
  React.useEffect(() => {
    if (!castContext) return;

    const CHANNEL = 'urn:x-cast:testChannel';
    castContext.addCustomMessageListener(CHANNEL, function (customEvent) {
      try {
        // send here
        const message = JSON.parse(customEvent.data);
        console.log('MESSAGE REÇU:', message);

        switch (message.type) {
          case 'move':
            if (characterSpriteRef.current) {
              const newY = Math.max(10, Math.min(690, message.y));
              characterSpriteRef.current.y = newY;
              setUserPosY(newY);
            }
            break;

          case 'shoot':
            handleShoot();
            break;

          case 'start':
            if (gameOver) {
              setGameOver(false);
            } else if (!gameStart) {
              setGameStart(true);
            }
            break;

          default:
            console.warn('Unknown action type:', message.type);
        }
      } catch (error) {
        console.error('Failed to parse incoming message:', error);
      }
    });
  }, [castContext, characterSpriteRef, gameOver, gameStart, setGameOver, setGameStart, handleShoot]);

  // Logique du score
  React.useEffect(() => {
    const bestScore = localStorage.getItem('bestScore') || 0;
    if (score > bestScore) {
      localStorage.setItem('bestScore', score);
      localStorage.setItem('bestScoreUsername', 'Anonymous');
    }
  }, [score]);

  // test commande de la manette avec keyboard
  // const move = (y) => {
  //   if (characterSpriteRef.current) {
  //     const newY = Math.max(10, Math.min(userPosY + y, 690));
  //     characterSpriteRef.current.y = newY;
  //     setUserPosY(newY);
  //   }
  // }


  return (
    <>
      <div id='menu-root' style={{ display: isClickedGame1 ? 'none' : 'initial', backgroundColor: 'rgba(33, 52, 72, 1)', alignContent: 'center', width: '100vw', height: '100vh' }}>
        <h1><a>Welcome to NOT Mini-Clip !</a></h1>
        <div className='container-grid'>
          <Container gameName='Alien Shooter III : Remastered' setIsClicked={setIsClickedGame1} />
          <Container setIsClicked={setIsClickedGame2} />
          <Container setIsClicked={setIsClickedGame3} />
          <Container setIsClicked={setIsClickedGame4} />
        </div>
      </div>

      <div
        style={{
          display: isClickedGame1 ? 'flex' : 'none',
          justifyContent: 'center',
          backgroundColor: '#006400',
          width: 'fit-content',
          margin: 'auto',
          border: '5px solid black'
        }}>

        <div style={{ position: 'absolute', display: 'flex', gap: '10px' }}>
          <h1 style={{ margin: 0, color: 'white' }}>Score : {score}</h1>
          <button
            onClick={quit}
            style={{
              margin: 'auto',
              color: 'red',
              backgroundColor: 'black',
              width: 'fit-content',
              height: 'fit-content',
              padding: '5px'
            }}>quit?</button>
        </div>

        {/* test commande de la manette avec keyboard */}
        {/* <div style={{ position: 'absolute' }}>
          <button onClick={() => handleShoot()}>shoot</button>
          <button onClick={() => move(-10)}>up</button>
          <button onClick={() => move(10)}>down</button>
        </div> */}

        <canvas ref={canvasRef}></canvas>

        <button
          id='startBtn'
          onClick={handleStartGame}
          style={{
            display: gameStart ? 'none' : 'initial',
            position: 'absolute',
            alignSelf: 'center',
            width: '500px',
            height: '150px',
            fontSize: '80px',
            background: 'aliceblue'
          }}>
          {startText}
        </button>

        <button
          id='restartBtn'
          onClick={handleRestartGame}
          style={{
            display: gameOver ? 'initial' : 'none',
            position: 'absolute',
            alignSelf: 'center',
            width: '500px',
            height: '150px',
            fontSize: '80px',
            background: 'aliceblue'
          }}>
          Restart?
        </button>
      </div>
    </>
  );
};

export default PixiCanvas;