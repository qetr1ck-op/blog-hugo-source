+++
title = "PatternCraft"
categories = []
tags = []
date = "2017-03-05T01:35:33+02:00"

+++

An awesome explanation of GOF design patterns. The only way to learn pattern is to know what problem it solves.

<!--more-->

# State

The [State Design Pattern](https://www.youtube.com/watch?v=yZt7mUVDijU) can be used, for example, to manage the state of tank in StarCraft game.

The pattern consists in isolating the state logic in different `class`es than having multiple `if`s to determinate the flow.

```js
class TankState {
    constructor(damage = 5, canMove = true) {
        Object.assign(this, { damage, canMove });
    }

    static get defaultState() { return new SiegeState(); }
}

// state #1
class SiegeState extends TankState {
    constructor() {
        super(20, false);
    }
}

// state #2
class SpeedState extends TankState {
    constructor() {
        super(5, true);
    }
}

class Tank {
    constructor() {
        this.state = TankState.defaultState;
    }

    // implementation bellow relies only on current state, without using multiple if/switch
    get canMove() { return this.state.canMove; } 

    get damage() { return this.state.damage; }
}

```

Test specs:

```js
describe('State pattern', () => {
    it('Default tank state is SiegeState', () => {
        const tank = new Tank();
        
        expect(tank.state instanceof SiegeTank).to.be.true;
    });

    it('SiegeState', () => {
        const tank = new SiegeState();

        expect(tank.damage).to.equal(20);
        expect(tank.canMove).to.be.false;
    });

    it('SpeedState', () => {
        const tank = new SpeedState();

        expect(tank.damage).to.equal(5);
        expect(tank.canMove).to.be.true;
    });
})
```

# Strategy

The [Strategy Design Pattern](https://www.youtube.com/watch?v=MOEsKHqLiBM) can be used, for example, to determinate how a unit moves in StarCraft game.

The pattern consists in having different strategy for one functionality. A unit, for example, can move by walking or flying or swimming.

```js
// strategy #1
class Walk() {
    move(unit) {
        unit.position += 5;
    }
}
// strategy #2
class Fly() {
    move(unit) {
        unit.position += 20;
    }
}

class Viking {
    constructor() {
        this.moveBehavior = new Walk();
        this.position = 0;
    }

    move() { this.moveBehavior.move(this); } // delegate behavior to strategy
}
```

Test specs:

```js
describe('Strategy pattern', () => {
    it('Default viking move behavior is Walk', () => {
        const viking = new Viking();
        
        expect(viking.moveBehavior instanceof Walk).to.be.true;
    });

    it('Walk behavior', () => {
        const viking = new Viking();

        viking.move();
        expect(viking.position).to.equal(5);
        viking.move();
        expect(viking.position).to.equal(10);
    });

    it('Fly behavior', () => {
        const viking = new Viking();
        
        viking.moveBehavior = new Fly();
        viking.move();
        expect(viking.position).to.equal(20);
        viking.move();
        expect(viking.position).to.equal(40);
    });
})
```

# Adapter

The [Adapter Design Pattern](https://www.youtube.com/watch?v=hvpXKZhNINc) can be used, to insert an external character in the game.

The pattern consists in having a wrapper class to adapt the external source.

```js
// in app characters
class Marine {
  attack(target) {
    target.health -= 6;
  }
}

class Zealot {
  attack(target) {
    target.health -= 8;
  }
}

class Zergling {
  attack(target) {
    target.health -= 5;
  }
}

// external
class Mario {
  jumpAttack() {
    console.log('Mamamia!');
    return 3;
  }
}

// mario adapter
class MarioAdapter {
    constructor(mario) {
        this.mario = mario;
    }
    
    attack(target) {
        target.health -= this.mario.jumpAttack();
    }
}
```

Test specs: 

```js
describe('Adapter pattern', () => {
    it('Mario can not attack', () => {
        const mario = new Mario();
        
        expect(mario.attack).to.be.undefined;
    });

    it('MarioAdapter can attack', () => {
        const mario = new MarioAdapter();
        const target = { health: 50 };

        mario.attack(target);

        expect(target.health).to.equal(47);
    });
})
```

# Visitor

The [Strategy Design Pattern](https://www.youtube.com/watch?v=KSEyIXnknoY) can be used, for example, to determinate how an attack deals a different amount of damage to unit in StarCraft game.

The pattern delegates the responsibilities to different `class`. When a unit takes a damage it can say to the `visitor` what do with itself.

```js
class Soldier {
    constructor(health = 100) {
        Object.assign(this, { health });
    }
}

class Marine extends Soldier {
    constructor() {
        super();
    }
    
    // an idiomatic name
    accept(visitor) {
        visitor.visitLight(this);
    }
}

class Marauder extends Soldier {
    constructor() {
        super(180);
    }
    
    accept(visitor) {
        visitor.visitArmored(this);
    }
}

// visitor
class TankBullet {
    visitLight(unit) {
        unit.health -= 11;
    }
    visitArmored(unit) {
        unit.health -= 32;
    }
}
```

Test specs: 

```js
describe('Visitor pattern', () => {
    it('Visit light', () => {
        const marine = new Marine();
        const tankBullet = new TankBullet();
        
        tankBullet.visitLight(marine);

        expect(mario.health).to.be(89);
    });

    it('Visit armored', () => {
        const marauder = new Marauder();
        const tankBullet = new TankBullet();
        
        tankBullet.visitArmored(marauder);

        expect(mario.health).to.be(148);
    });
})
```

# Decorator

The [Decorator Design Pattern](https://www.youtube.com/watch?v=17XTOODeWQE) can be used, for example, to manage upgrades.

The pattern is consists in upgrade your base class with extra functionality.

A decorator will receive an instance of base class and use it to call a new thing you want.

```js
class Marine {
    constructor(_damage, _armor) {
        Object.assign(this, { _damage, _armor });
    }

    get damage { return this._damage; }
    get armor { return this._armor; }
}

// decorator #1
class WeaponUpgrade {
    constructor(unit) {
        this.unit = unit;
    }

    get damage { return this.unit.damage + 1; }
    get armor { return this.unit.armor; }
}

// decorator #2
class ArmorUpgrade {
    constructor(unit) {
        this.unit = unit;
    }

    get damage { return this.unit.damage; }
    get armor { return this.unit.armor + 1; }
}

let marine = new Marine();
marine = new WeaponUpgrade(marine);
marine = new WeaponUpgrade(marine);
```

Test specs: 

```js
describe('Decorator pattern', () => {
    it('Weapon upgrade', () => {
        let marine = new Marine(10, 2);
        
        marine = new WeaponUpgrade(marine);
        marine = new WeaponUpgrade(marine);

        expect(marine.damage).to.be(12);
        expect(marine.armor).to.be(2);
    });

    it('Armor upgrade', () => {
        let marine = new Marine(10, 2);
        
        marine = new ArmorUpgrade(marine);
        marine = new ArmorUpgrade(marine);

        expect(marine.armor).to.be(4);
        expect(marine.damage).to.be(10);
    });
})
```

# Strategy

The [Strategy Design Pattern](https://www.youtube.com/watch?v=MOEsKHqLiBM) can be used, for example, to queue actions.

The pattern consists in isolating command logic in a class so it can:

* queue: you can queue actions to move a probe to a different locations
* undone: you can tell a probe to build something and then call a stop command to undo the action
* validate: you can check if the action can be executed or not, you can not move if building action is in progress

```js
class Probe {
    constructor(commands = [], minerals = 0, x = 0, y = 0) {
        Object.assign(this, {
            position: { x, y },
            commands,
            minerals
        });
    }

    move(x, y) {
        this.commands = [...this.commands, new MoveCommand(this, x, y)];
    }

    gather() {
        this.commands = [...this.commands, new GatherCommand(this)];
    }
}

// command #1
class MoveCommand {
    constructor(unit, x, y) {
        Object.assign(this, { unit, x, y});
    }

    // idiomatic 
    execute() {
        this.unit.position.x = this.x;
        this.unit.position.y = this.y;
    }
}

// command #2
class GatherCommand {
    constructor(unit) {
        this.unit = unit;
    }

    execute() {
        if (this.canExecute) {
            this.unit.minerals += 5;
        }
    }

    get canExecute() {
        return this.unit.minerals === 0;
    }
}
```

Test specs: 

```js
describe('Command pattern', () => {
    it('MoveCommand should move unit', () => {
        const unit = new Probe();
        const moveBehavior = new MoveBehavior(unit, 10, 20);

        moveBehavior.execute();

        expect(unit.position.x).to.equal(10);
        expect(unit.position.y).to.equal(20);
    });

    it('GatherCommand should gather resources', () => {
        const unit = new Probe();
        const moveBehavior = new GatherBehavior(unit);

        moveBehavior.execute();

        expect(unit.materials).to.equal(5);
    });

    it('GatherCommand should only gather resources if unit does not have resources', () => {
        const unit = new Probe();
        const moveBehavior = new GatherBehavior(unit);

        expect(unit.materials).to.equal(5);
        moveBehavior.execute();
        expect(unit.materials).to.equal(5);
        moveBehavior.execute();
        expect(unit.materials).to.equal(5);
    });
})
```

# Proxy

The [Proxy Design Pattern](https://www.youtube.com/watch?v=WcAV9rOGjxw) can be used, for example, to create a `drone` by using a proxy `cocoon` class.

The pattern is responsible ("stands in") for all requests on original object, typical extend or change behavior, than delegates action again to original object.

```js
// original
class Drone {
    move(x, y) {
        this.x = x;
        this.y = y;
    }
}

// proxy
class Cocoon {
    constructor() {
        this.lifetime = 3000;
        // proxing
        this.hatchDrone();
    }

    hatchDrone() {
        setTimeout(this.onHatchDroneDone.bind(this), this.lifetime);
    }
    
    onHatchDroneDone() {
      this.drone = new Drone();
      this.drone.move(this.rallyPath.x, this.rallyPath.y);
    }

    move(x, y) {
        if (this.drone) {
            this.drone.move(x, y);
        } else {
          this.rallyPath = { x, y };
        }
    }
}
```

```js
describe('Proxy pattern', () => {
    it('Create drone when cocoon is hatched', done => {
        const drone = new Cocoon();
        
        drone.move(10, 20);

        expect(drone.drone).to.be.undefined;
        expect(drone.rallyPath).to.be({ x: 10, y: 20 });

        setTimeout(() => {
            expect(drone.drone).to.be.defined;
            expect(drone.drone.x).to.be.equal(10);
            expect(drone.drone.y).to.be.equal(20);
            done();
        }, drone.lifetime)
    });

    it('Visit armored', () => {
        const marauder = new Marauder();
        const tankBullet = new TankBullet();
        
        tankBullet.visitArmored(marauder);

        expect(mario.health).to.be(148);
    });
})
```

A classical JS example to proxing, for example, HTTP request by adding logging before every action:

```js
// proxy
const proxiedFetch = fetch;

fetch = (url) => {
    // proxing
    console.log('logging...');
    // original
    proxiedFetch(url);
}
```

Save my day:

* [Original series of John Lindquist](https://www.youtube.com/playlist?list=PL8B19C3040F6381A2)
* [Just a great resource of Design Patterns](https://sourcemaking.com/design_patterns)