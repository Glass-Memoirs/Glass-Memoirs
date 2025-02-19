/*
 OK REDOING THIS COMMENTING BECAUSE I LOST IT AGAIN
 Credits:
 - EE for ideas, playtesting, status effect icons, and also making the undithered gif for entropy
 - Lustre for making the dithered version of the fractal gif
 - Sola for making the monochrome eye for Entropy's action as well as the ditherd soul hotpocket gif
 - Narri, Kuvi, and Adr for judging my code
 - Adenator for the code for making the status pool because i was probably not gonna figure that out at all
 - Mewo for helping with StupidHorrible text
 SECTIONS:
 1. Dialogue changing
 2. CSS
 3. Humors
 4. Augments
 5. Combat Modifiers
 6. Status Effects
 7. Combat Actions
 8. Merchant Code

 TO DO:
+ Make Entropy's 2nd action
+ Make the modifiers for surging
+ work on meat, stupidhorrible, and SiIva
*/

//Dialogue changing
document.addEventListener("readystatechange", (event) => {
	if(document.readyState == 'complete') {
		env.dialogues["dreammod"] = generateDialogueObject(`
loop
    basterminal
        ALTERED
        TEXEC::\`STARTING TENSION::'\${check("e3a2_tension") || 1}'\`
            AUTOADVANCE::
        TEXEC::\`STARTING HUMORS::'\${check("e3a2_newcomp") || "normal"}'\`
            AUTOADVANCE::
        TEXEC::\`STARTING SFER::'\${check("e3a2_sfer") || "0"}'\`
            AUTOADVANCE::
        TEXEC::\`FISH SPAWN RATE::'\${check("e3a2_fishchance") ? \`\${Number(check("e3a2_fishchance")) * 100}%\`: '10%'}'\`
            AUTOADVANCE::
            SHOWIF::"e3a2__fishy"

    RESPOBJ::basterminalResp

start
    sourceless
        the terminal displays various controls and settings for the dream.
    
    basterminal
        hi :b
        CURRENT SETTINGS
        TEXEC::\`STARTING TENSION::'\${check("e3a2_tension") || 1}'\`
        TEXEC::\`STARTING HUMORS::'\${check("e3a2_newcomp") || "normal"}'\`
        TEXEC::\`STARTING SFER::'\${check("e3a2_sfer") || "0"}'\`
        TEXEC::\`FISH SPAWN RATE::'\${check("e3a2_fishchance") ? \`\${Number(check("e3a2_fishchance")) * 100}%\`: '10%'}'\`
            SHOWIF::"e3a2__fishy"
    
    RESPOBJ::basterminalResp

tension
    basterminal
        select starting tension
        1 is default
    
    RESPONSES::self
        1<+>loop
            EXEC::change("e3a2_tension", 1)
            HIDEREAD::
        2<+>loop
            EXEC::change("e3a2_tension", 2)
            HIDEREAD::
        3<+>loop
            EXEC::change("e3a2_tension", 3)
            HIDEREAD::
        4<+>loop
            EXEC::change("e3a2_tension", 4)
            HIDEREAD::
        5<+>loop
            EXEC::change("e3a2_tension", 5)
            HIDEREAD::
        6<+>loop
            EXEC::change("e3a2_tension", 6)
            HIDEREAD::

humors
    basterminal
        select starting <span class="code">humor</span> set
        normal is default
    
    RESPONSES::self
        normal<+>loop
            EXEC::change("e3a2_newcomp", "normal")
            HIDEREAD::
        abundant<+>loop
            EXEC::change("e3a2_newcomp", "abundant")
            HIDEREAD::
        too many<+>loop
            EXEC::change("e3a2_newcomp", "too many")
            HIDEREAD::
        claws<+>loop
            EXEC::change("e3a2_newcomp", "claws")
            HIDEREAD::
        eyes<+>loop
            EXEC::change("e3a2_newcomp", "eyes")
            HIDEREAD::
        ichor<+>loop
            EXEC::change("e3a2_newcomp", "ichor")
            HIDEREAD::
        light<+>loop
            EXEC::change("e3a2_newcomp", "light")
            HIDEREAD::
        bone<+>loop
            EXEC::change("e3a2_newcomp", "bone")
            HIDEREAD::
        entropy<+>loop
            EXEC::change("e3a2_newcomp", "entropy")
            HIDEREAD::
        surging<+>loop
            EXEC::change("e3a2_newcomp", "surging")
            HIDEREAD::

fish
    basterminal
        select fish spawn rate
        10% is default
    
    RESPONSES::self
        normal (10%)<+>loop
            EXEC::change("e3a2_fishchance", "0.1")
            HIDEREAD::
        foolish (25%)<+>loop
            EXEC::change("e3a2_fishchance", "0.25")
            HIDEREAD::
        likely (50%)<+>loop
            EXEC::change("e3a2_fishchance", "0.5")
            HIDEREAD::
        guaranteed (100%)<+>loop
            EXEC::change("e3a2_fishchance", "1")
            HIDEREAD::

sfer
    basterminal
        select starting sfer
        none is default
    
    RESPONSES::self
        none (0)<+>loop
            EXEC::change("e3a2_sfer", "DELETE")
            HIDEREAD::

        some (20)<+>loop
            EXEC::change("e3a2_sfer", 20)
            HIDEREAD::

        abundant(40)<+>loop
            EXEC::change("e3a2_sfer", 40)
            HIDEREAD::

        a lot (99)<+>loop
            EXEC::change("e3a2_sfer", 99)
            HIDEREAD::

        mod tester's delight(999)<+>loop
            EXEC::change("e3a2_sfer", 999)
            HIDEREAD::
`)
	}
} ) ;

document.addEventListener("readystatechange", (event) => {
	if(document.readyState == 'complete'){
		switch(check("e3a2_newcomp")) {
		case "too many":
			page.flags.components = {
				ichor: 30,
				claws: 30,
				light: 30,
				bone: 30,
				eyes: 30,
				entropy: 30,
                    surging: 30,
			}
			
			page.party[0].components["primary"] = "claws"
			page.party[0].components["secondary"] = "claws"
			page.party[0].components["utility"] = "eyes"

			page.party[1].components["primary"] = "light"
			page.party[1].components["secondary"] = "eyes"
			page.party[1].components["utility"] = "bone"

			page.party[2].components["primary"] = "eyes"
			page.party[2].components["secondary"] = "ichor"
			page.party[2].components["utility"] = "light"
				break

		case "abundant":
			page.flags.components = {
				ichor: 3,
				claws: 3,
				light: 3,
				bone: 3,
				eyes: 3,
				entropy: 3,
                    surging: 3,
			}
			
			page.party[0].components["primary"] = "claws"
			page.party[0].components["secondary"] = "claws"
			page.party[0].components["utility"] = "eyes"

			page.party[1].components["primary"] = "light"
			page.party[1].components["secondary"] = "eyes"
			page.party[1].components["utility"] = "bone"

			page.party[2].components["primary"] = "eyes"
			page.party[2].components["secondary"] = "ichor"
			page.party[2].components["utility"] = "light"
				break

		case "entropy":
			page.flags.components = { entropy: 12 }

			page.party.forEach(member=>{
				member.components["primary"] = "entropy"
				member.components["secondary"] = "entropy"
				member.components["utility"] = "entropy"
			})

          case "surge":
               page.flags.components = { surging: 12}

               page.party.forEach(member=>{
                    member.components["primary"] = "surging"
                    member.components["secondary"] = "surging"
                    member.components["utility"] = "surging"
               })
		}
	}
});

//CSS
content.insertAdjacentHTML('beforeend', `<style>
/* for making player cards not overflow offscreen */
#ally-team .actor {
    background-color: var(--dark-color);
    margin-top: 50px;
}

#ally-team {
    bottom: 5vh;
    flex-wrap: wrap;
    z-index: 29;
}

#crittaresult, #crittaresult * {
    transition: transform 2s ease-in-out, opacity 2s ease-in-out;
    text-align: center;
    z-index: 30;
}


/* humor styling */
[component="entropy"] {
    --background: url(https://glass-memoirs.github.io/Glass-Memoirs/ENTROPYHUMORundithered.gif);
    --organelle-background: url(https://glass-memoirs.github.io/Glass-Memoirs/ENTROPYHUMORundithered.gif);    
    --background-small:  url(https://glass-memoirs.github.io/Glass-Memoirs/ENTROPYHUMORundithered.gif);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--dark-color);
    --accent-color: var(--bright-color);
    --font-color: var(--neutral-color);
}
[component="surging"] {
    --background: url(https://glass-memoirs.github.io/Glass-Memoirs/surginghumoristelf.png);
    --organelle-background: url(/img/textures/yneural.gif);
    --background-small: url(https://glass-memoirs.github.io/Glass-Memoirs/surgingHumor.png);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--dark-color);
    --accent-color: var(--friend-color);
    --font-color: var(--fundfriend-color);
}
</style>`);
//HUMORS
env.COMBAT_COMPONENTS.entropy = {
     name: "Entropy",
     slug: "entropy",
     description: "'repetition and chaos'",
     help: "'move';'balance';'repeat'",

     primary: { //damage scales by positive effects on user
          alterations: [["primary", "momentum"]],     

          stats: {
               maxhp: 4
          },
     },

     secondary: { //Removes status effects from both you and the enemy
          alterations: [["secondary", "level_statuses"]],
          stats: {
               maxhp: 4
          }
     },

     utility: { //randomly strike enemies with attack, has chance to keep going
          alterations: [["evade", "wild_frenzy"]],
          stats: {
               maxhp: 4
          }
     },
     combatModifiers: ["entropy_eternal", "entropy_eyes", "entropy_clock", "entropy_heat"]
}

env.COMBAT_COMPONENTS.surging = {
     name: "Surge",
     slug: "surging",
     description: "'a show of maddening speeds','frenzied by velzie's eye','pick up the pace','let us finish the play!'",
     help: "'charge';'awaken';'overcharge'",

     primary: {
          alterations: [["primary", "tormenting_delight"]],
          stats: {
               maxhp: 2
          }
     },
     secondary: {
          alterations: [["secondary", "back_to_stage"]],
          stats: {
               maxhp: 2
          }
     },
     utility: {
          alterations: [["evade", "velnits_lament"]], //surging surge lmao. like yeah thats what it does - note::velnits lamet use to be called surging surge
          stats: {
               maxhp: 2
          }
     },
     combatModifiers: ["surging_two", "surging_set","surging_pace"]
}

/*
env.COMBAT_COMPONENTS.meat = {
     name: "Meat",
     slug: "meat",
     description: "shhhh",
     help: "not here yet",

     primary: {
          alterations: [["primary"]],
          stats: {
               maxhp: 3
          }
     },
     secondary: {
          alterations: [["secondary"]],
          stats: {
               maxhp: 3
          }
     },
     utility: {
          alterations: [["evade"]],
          stats: {
               maxhp: 3
          }
     }
}
*/


//AUGMENTS
/*
+ Yknow, you dont really need to look at these, they all do the same layout and are generally hard to break.
+ that being said, mayber you might need to see these for move names?
*/
//ENTROPY
/*
[]^[]< my fucking god why did i not give them entropy_
*/
env.ACTOR_AUGMENTS.generic.third_law = {
	slug: "third_law",
	name: "3rd Law",
	image: "/img/sprites/combat/augs/cripple.gif",
	description: "'barrel into foes with great energy';'half beneficial effects for power'",
	alterations: [["momentum", "player_law"]],
	component: ["primary", "entropy"],
	cost: 2
}

env.ACTOR_AUGMENTS.generic.rig_field = {
	slug: "rig_field",
	name: "Rig Field",
	image: "/img/sprites/combat/augs/barrier.gif",
	description: "'rig the fight in your favour';'steal beneficial statuses from the foe'",
	alterations: [["level_statuses", "player_rig"]],
	component: ["secondary", "entropy"],
	cost: 2
}

env.ACTOR_AUGMENTS.generic.exp_overload = {
     slug: "exp_overload",
     name: "Exponential Overload",
     image: "/img/sprites/combat/augs/cripple.gif",
     description: "'focus movement into quick planned strikes';'improves striking'",
     alterations: [["wild_frenzy", "player_overload"]],
     component: ["utility", "entropy"],
     cost: 2
}
//SURGING
env.ACTOR_AUGMENTS.showmanship = {
	slug: "showmanship",
	name: "SHOWMANSHIP",
	description: "'SEE HOW THEY FALL!','THEY THOUGHT THEY WERE LAUGHING DOWN AT US','ONLY FOR US TO SWEEP THEIR KNEES!'",
	alteration: [["tormenting_delight", "showmanship"]],
	component: ["primary", "surging"],
	cost: 2
}

env.ACTOR_AUGMENTS.method_acting = {
	slug: "method_acting",
	name: "Method Acting",
	description: "'STARVED THIN AND CHITTIN SCATTERED';'YOU MUST CONTINUE!';'VELZIE DEMANDS! VELZIE COMMANDS!'",
	alteration: [["back_to_stage", "method_acting"]],
	component: ["secondary", "surging"],
	cost: 2
}

env.ACTOR_AUGMENTS.sacrificial_act = {
	slug: "sacrificial_act",
	name: "Sacrifical Act",
	description: "'LET THE SHOW GO FORTH! AGAIN!';'LET VELZIE VEIW OUR CRUDE IMMITATIONS';'FOR THAT WILL ONLY INSPIRE US MORE!'",
	alteration: [["velnits_lament", "sacrificial_act"]],
	component: ["evade", "surging"],
	cost: 2
}

//COMBAT MODIFIERS
env.MODIFIERS.entropy_eternal = {
	name: "Eternal Decay",
	getHelp: ()=> { return env.STATUS_EFFECTS.entropy_eternal.help },
	alterations: {
		all: [ ["STATUS", "entropy_eternal"] ]
	}
}

env.MODIFIERS.entropy_eyes = {
	name: "Shattered Eyes",
	getHelp: ()=> { return env.STATUS_EFFECTS.entropy_eyes.help },
	alterations: {
		all: [ ["STATUS", "entropy_eyes"] ]
	}
}

env.MODIFIERS.entropy_clock = {
	name: "Broken Clock",
	getHelp: ()=> {return env.STATUS_EFFECTS.entropy_clock.help},
	alterations: {
		all: [["STATUS", "entropy_clock"]]
	}
}

env.MODIFIERS.entropy_heat ={
	name: "Heat Death",
	getHelp: ()=> {return env.STATUS_EFFECTS.entropy_heat.help},
	alterations: {
		all: [["STATUS", "entropy_heat"]]
	}
}
//surging
env.MODIFIERS.surging_two = {
	name: "Two Time",
	getHelp: ()=> {return env.STATUS_EFFECTS.surging_two},
	alterations:{
		all: [["STATUS", "surging_two"]]
	}
}

env.MODIFIERS.surging_story = {
	name: "Temporary Setback",
	getHelp: ()=> {return env.STATUS_EFFECTS.surging_set},
	alterations:{
		all:[["STATUS", "surging_set"]]
	}
}

env.MODIFIERS.surging_pace = {
	name: "Double The Pace",
	getHelp: ()=> {return env.STATUS_EFFECTS.surging_pace},
	alterations:{
		all:[["STATUS","surging_pace"]]
	}
}

//STATUS EFFECTS
/*
+ Yeah these needed doccumenting
*/
//entropy
env.STATUS_EFFECTS.entropy_eternal = {//THIS WAS THE HARDEST
	slug: "entropy_eternal",
	name: "Eternal Decay",
	passive: "modifier",
	beneficial: false,
	icon: "/img/sprites/combat/passives/light_glee.gif",
	impulse: {type: "common", component: "entropy"},
	events: {
        
		onTurn: function() {
               /*
               Thank you adenator for making this code way before me!
               However, i think im gonna take a stab at making it doccumented.
               */
			target = this.status.affecting
			let statusPool = [] //List of valid status effects
			for (let i in env.STATUS_EFFECTS) { //takes the entire list of status effects (including modded)
				let statusData = env.STATUS_EFFECTS[i] //gives status to something comparable
				let usable = true //assuming that we can use it
				if(statusData.infinite) {usable = false} //in this case, moving infinite things could break something (glaring at windup)
				if(statusData.passive) {usable = false} //in this case, we dont really wanna shuffle passives.
				if(i.includes("global_")) {usable = false} //Globals are escalation and some fish modifiers.
				if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false} //AbsurdFrame specific statuses
				if(i == "imperfect_reset") {usable = false} //Firmament looping status. you already know
				if(i == "redirection") {usable = false} //honestly i dont know if im unable to move redirection around. it has an origin so just exclude it already
				if(i == "entropy_eternal") {usable = false} //yeah so, Passive: true and Passive: "modifier" dont equal the exact same thing
				if(i == "unnatural_carapace") {usable = false}
				if(i == "channeling_flat"|| i == "coiling_flat"|| i == "rocket_bearer") {usable = false}
//                  console.log(i, usable)
				if(usable) statusPool.push(i) //if that shit usable? add it to the list
			}
	        let validEffects = [] //list for who the modifier is affecting on the current turn
	        target.statusEffects.forEach((status, i) => { //get their status list!
//                  console.log(status)
				if((!status.infinite || !status.passive) && (statusPool.includes(status.slug))) { //ignore passive, infinite, or anything not in the pool
                	validEffects.push(status.slug) //if upper part goes "yeah", put it in the list
                }
            })
//	          console.log(validEffects)
            if(validEffects.length) validEffects.forEach((Replace) => { //if the list is not nothing, we run a little thing for each effect.
                let selectedStatus = statusPool[Math.floor(Math.random()*statusPool.length)] //grab random status from the statusPool (we can set the max to be its length, and remove partial values)
//              console.log(selectedStatus)
                let chance = 0.2 //dont want it to be always
//                  console.log(Replace)
                if(Math.random() < chance) { //if the random hits that 20%?
                	sendFloater({ //let them know whats going on!
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "DECAYED!",
                        isGood: false
                    })
		            if (hasStatus(target, Replace)) { //if the status didnt die or if it doesnt get rolled twice (i dunno if thats possible)
                    //slap it onto another person
		    	    	addStatus({target: target, origin: false, status: selectedStatus, length: Math.floor(hasStatus(target, Replace)), noReact: true})
                    //and then remove it from you!
			            removeStatus(target, Replace)
		            }     
                }
            })
        }
     },
     help: `most status effects have a 20% chance to become any other effects`
},

env.STATUS_EFFECTS.entropy_eyes = {
	slug: "entropy_eyes",
	name: "Shattered Eyes",
	passive: "modifier",
	beneficial: false,
	icon: "/img/sprites/combat/passives/light_dark.gif",
	events: {

		onTurn: function(){
			console.log("nothing here yet!")
			target = this.status.affecting
			let statusPool = []
			for (let i in env.STATUS_EFFECTS) {
				let statusData = env.STATUS_EFFECTS[i]
				let usable = true
				if(statusData.infinite) {usable = false}
				if(statusData.passive) {usable = false}
				if(i.includes("global_")) {usable = false}
				if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false}
				if(i == "imperfect_reset") {usable = false}
				if(i == "redirection") {usable = false}
				if(i == "entropy_eternal") {usable = false}
				if(i == "channeling_flat"|| i == "coiling_flat"|| i == "rocket_bearer") {usable=false}
				//console.log(i, usable)
				if(usable) statusPool.push(i)
			}
			let AllTargets = []
			env.rpg.enemyTeam.members.forEach((target) => {
				if (target => target.state != "dead" && target.state != "lastStand") {
					AllTargets.push(target)
				}
			})
			env.rpg.allyTeam.members.forEach((target)=> {
				if (target => target.state != "dead" && target.state != "lastStand") {
					AllTargets.push(target)
				}
			})
			let TakableEffects = []
			target.statusEffects.forEach((Deciding) => {
				if((!Deciding.infinite || !Deciding.passive) && (statusPool.includes(Deciding.slug))) {
					TakableEffects.push(Deciding.slug)
				}
			})
			if(TakableEffects.length) for (let i = 0; i <= Math.floor(Math.random()*TakableEffects.length); i++) {
				let Chance = 0.4
				if (Math.random() < Chance) {
					sendFloater({
						target: this.status.affecting,
						type: "arbitrary",
						arbitraryString: "REFRACTED!",
						isGood: false
					})
					let TakingStat = TakableEffects.sample()
					let SendingTo = AllTargets.sample({noRepeat: true})
					if (hasStatus(target, TakingStat)) {
						addStatus({target: SendingTo, status: TakingStat, length: Math.floor(hasStatus(target, TakingStat))})
						removeStatus(target, TakingStat)
					}
				}
			}
		}
	},
	help: `Effects have a 40% chance of being moved to another actor`
},

env.STATUS_EFFECTS.entropy_clock = {
	slug: "entropy_clock",
	name: "Broken Clock",
	passive: true,
	beneficial: false,
	icon: "/img/sprites/combat/passives/claws_infection.gif",
	events: {
		onTurn: function() {
			reactDialogue(this.status.affecting, 'rot');
			combatHit(this.status.affecting, {amt: 2, autohit: true, redirectable: false, runEvents: false});
			play('status', 0.75, 0.5);
		},
	},
	help: "Each turn loose 2hp"
},

env.STATUS_EFFECTS.entropy_heat = {
	slug: "entropy_heat",
	name: "Heat Death",
	passive: true,
	beneficial: true,
	icon: "/img/sprites/combat/augs/bazruka.gif",
	events: {
		onBeforeAction: function(context) {
			if(!context.settings.action.type.includes("target")) return;
			let Chance = 0.23
			// alter action maybe
			if(Math.random() < Chance) {
				context.settings.action = env.ACTIONS["entropy_burnout"]
				let subject = context.settings.user
				sendFloater({
					target: subject,
					type: "arbitrary",
					arbitraryString: "SPARKING",
					isGood: false,
					size: 2,
				})
			}
		},
	},
	help: 'Attacks have a 23% chance to become Burnout'
},

env.STATUS_EFFECTS.entropy_reaction = {
	slug: "entropy_reaction",
	name: "ACTION:: REACT",
	passive: true,
	beneficial: true,
	icon: "https://glass-memoirs.github.io/Glass-Memoirs/eyew.gif",
	impulse: {type: "action", component: "entropy"},
	events: {
		onCrit: function({subject, target}) {
			let modifierPool = []
			for (let i in env.STATUS_EFFECTS) {
				let statusData = env.STATUS_EFFECTS[i]
				let usable = false
				if(statusData.passive) {usable = true}
				if(statusData.infinite || (statusData.slug != "windup")) {usable = true}
				if(i.includes("global_")||i.includes("malware_")||i.includes("fish_")) {usable = false}
				if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false}
				if(i == "imperfect_reset") {usable = false}
				if(i == "redirection" || i == "ethereal" || i == "immobile" || i == "conjoined" || i == "permanent_hp") {usable = false}
				console.log(i, usable)
				if(usable) modifierPool.push(i)
			}
			console.log(modifierPool)
			let targetModifiers = []
			for (let i in subject.statusEffects) {
				let status = subject.statusEffects[i]
				console.log(status)
				if((status.infinite || status.passive || !i.includes("global_")) && (modifierPool.includes(status.slug))) {
					targetModifiers.push(status.slug)
				}
			}
			console.log(targetModifiers)
			if (targetModifiers.length) for(let i = 0; i<1; i++) {
				let Chance = 0.2
				if (Math.random() < Chance) {
					sendFloater({
						target: subject,
						type: "arbitrary",
						arbitraryString: "DRAINED!",
						isGood: false
					})
					let KillModif = targetModifiers.sample()
					removeStatus(subject, KillModif, {forceRemoveStatus: true})
				}
			}
		}
	},
	help: '20% chance to remove random status or impulse'
}

env.STATUS_EFFECTS.exp_over = { //This was what spurred this entire idea. The interaction between Bazruka and Wild Surge was interesting
	slug: "exp_over",
	name: "Exponential Overload",
	beneficial: true,
	infinite: true,
	icon: "https://glass-memoirs.github.io/Glass-Memoirs/Overclocked.png",
	events: {
		onTurn: function() { 
			reactDialogue(this.status.affecting, 'surge') 
			delete this.status.justGotSurge
		},
		onAction: function({user, action, target, beingUsedAsync}) {
			if(this.status.justGotSurge || beingUsedAsync || ["incoherent_", "steer", "floor", "windup", "intrusive"].some(slugpart => action.slug.includes(slugpart)) ||
				 !action.type.includes("target") ||(!action.beneficial && target.team.name == "ally") ||(action.beneficial && target.team.name == "enemy")) return;
			setTimeout(()=>{
				sendFloater({
					target: user,
					type: "arbitrary",
					arbitraryString: "EXPONENTIAL SURGE!",
					size: 1.5,
				})
				readoutAdd({
					message: `${user.name} enters a deeply focused flurry! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
					name: "sourceless", 
					type: "sourceless combat minordetail", 
					show: false,
					sfx: false
				})
				env.GENERIC_ACTIONS.teamWave({
					team: target.team,
					exec: (actor, i) => {
						if(actor == target) return; // we skip the original target
						env.GENERIC_ACTIONS.teamWave({
							team: target.team,
							exec: (actor, i) => {
								if(actor == target) return; // we skip the original target
								useAction(user, action, actor, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "exponential overload"})
							}
						})
					}
				})
			}, 500)
			removeStatus(this.status.affecting, "exp_over")
			addStatus({target:user, status: 'stun', length: 2, noReact: true})
			addStatus({target:user, status: 'vulnerable', length: 3, noReact: true})
		},
		onCreated: function({statusObj}) {
			if(statusObj.slug == this.status.slug) this.status.justGotSurge = true
		},
	},
	help: "on next active targeted action, gain 1T:STUN, and use across the entire target team\nif beneficial, action used on all allies\nif offensive, action used on all foes"
},

env.STATUS_EFFECTS.burnout = {
	slug: "burnout",
	name: "Burnout",
	beneficial: false,
	icon: "https://glass-memoirs.github.io/Glass-Memoirs/Hhhot p oc k e t.gif",
	events:{
		onCrit: function({subject, attack, originalEventTarget}) {
			removeStatus(this.status.affecting, 'burnout',{runEvents: false})
			sendFloater({
				target: this.status.affecting,
				type: "arbitrary",
				arbitraryString: "DOUSED!",
				size: 1,
			})
			readoutAdd({
				message: `${this.status.affecting.name} puts out the flame on their enegrgy`, 
				name: "sourceless", 
				type: "sourceless combat minordetail",
				show: false,
				sfx: false
			})
		},
		onTurn: function({target}) {
			if (Math.floor(hasStatus(this.status.affecting, "burnout")) <= 2){
				addStatus({target: this.status.affecting, status: "hotpocket", length: 2})
			}
		},
	},
	help: 'Once status runs out, Explode.'
},

env.STATUS_EFFECTS.hotpocket = {
	slug: "hotpocket",
	name: "Imminent Death",
	beneficial: false,
	icon: "https://glass-memoirs.github.io/Glass-Memoirs/BSTRDIZEDHOTPOCKET.gif",
	events: {
		onTurn: function() {
			combatHit(this.status.affecting, {amt: 1000, autohit: true, redirectable: false})
		}
	},
	help: "Explode! :}"
},

//surging
env.STATUS_EFFECTS.surging_two = {
	slug: "surging_two",
	name: "Two Time",
	beneficial: true,
	passive: true,
	icon: "https://glass-memoirs.github.io/Glass-Memoirs/twotime.png",
	impulse: {type: "common",component: "surging"},
	events: {
		onCreated: function() {
			addStatus(this.status.affecting,"surge")
		}
	},
	help: "gives surge on fight start."
}

env.STATUS_EFFECTS.surging_set = {
	slug: "surging_set",
	name: "Temporary Setback",
	passive: "modifier",
	beneficial: false,
	icon: "https://glass-memoirs.githuonb.io/Glass-Memoirs/twotime.png",
	events:{
		onRemoveStatus: function({target, removingStatusName}) {
			if(removingStatusName == "regen") {
				addStatus({target: target, origin: false, status: "stun", length: 2})
			}
		},
	},
	help: "gain 2T:STUN when REGEN is removed"
}

env.STATUS_EFFECTS.surging_pace = {
	slug: "surging_pace",
	name: "Double The Pace",
	passive: true,
	beneficial: false,
	icon: "https://glass-memoirs.githuonb.io/Glass-Memoirs/twotime.png",
	events: {
		onTurn: function() {
			addStatus(this.status.affecting, "surge")
		}
	}
}

//COMBAT ACTIONS
//ENTROPY
env.ACTIONS.momentum = { //couldnt figure out how to make this thing actually multiply damage by the amount of stat effects so i made it loop
	slug: "momentum",
	name: "Momentum",
	type: 'target',
	desc: "'redirect beneficial effects into power';'removes them once the hit connects'",
	anim: "basic-attack",
	help: "'100% -2HP + (XT:REGEN/FOCUS)\nSELF::-REGEN/FOCUS'",
	usage: {
		act: "%USER CHANNELS ENERGY INTO A SPRINT",
		crit: "%TARGET GETS KNOCKED OVER",
		hit: "%TARGET GETS SLAMMED INTO",
		miss: "%TARGET SIDESTEPS"
	},
	accuracy: 1,
	crit: 0.1,
	amt: 2,
	exec: function(user, target) {
		let action = this
		//console.log(hasStatus(user, 'focused'))
		//The looping part
		for (let i = 1; i <= (Math.floor(hasStatus(user, 'focused')) + Math.floor(hasStatus(user, 'regen'))); i++) {
			env.GENERIC_ACTIONS.singleTarget({
				action,
				user,
				target: target,
				critExec: ({target}) => {
					addStatus({target: target, status: 'stun', length: 1})
				}
			})
		}
		if(hasStatus(user, 'focused')) removeStatus(user, "focused")
		if(hasStatus(user, 'focused')) removeStatus(user, "regen")
	}
},

env.ACTIONS.player_law = { //Funky little move, had to change it up just like momentum.
	slug: "player_law",
	name: "3rd Law",
	type: 'target',
	desc: "'barrel towards foes';'chance to stun and apply vulnerable'",
	anim: "basic-attack",
	help: "'100% -2HP * (XT:REGEN+FOCUS) 15%C +2T STUN +3T VULNERABLE\nSELF:: #T/2 REGEN/FOCUS/EVASION'",
	usage: {
		act: "%USER CHANNELS ENERGY INTO A SPRINT",
		crit: "%TARGET GETS KNOCKED OVER",
		hit: "%TARGET GETS SLAMMED INTO",
		miss: "%TARGET SIDESTEPS"
	},
	accuracy: 1,
	crit: 0.15,
	amt: 2,
	exec: function(user, target) {
		let action = this
		for (let i = 1; i <= (Math.floor(hasStatus(user, 'focused')) + Math.floor(hasStatus(user, 'regen')) + Math.floor(hasStatus(user, 'evasion'))); i++) {
			env.GENERIC_ACTIONS.singleTarget({
				action: action, user,
				target: target,
				critExec: ({target}) => {
					addStatus({target: target, status: 'stun', length: 1})
					addStatus({target: target, status: 'vulnerable', length: 2})
				}
			})
		}
		if (hasStatus(user, 'focused')) {
			let half = 0 - Math.floor(hasStatus(user, 'focused') / 2)
			addStatus({target: user, status: "focused", length: half, noReact: true})
		}
		if (hasStatus(user, 'regen')) {
			let half = 0 - Math.floor(hasStatus(user, "regen") / 2)
			addStatus({target: user, status: "regen", length: half, noReact: true})
		}
		if (hasStatus(user, 'evasion')) {
			let half = 0 - Math.floor(hasStatus(user, 'evasion') / 2)
			addStatus({target: user, status: "evasion", length: half, noReact: true})
		}
	}
},

env.ACTIONS.level_statuses ={ //this would not deal damage for me at all so i made it deal no damage, also turns out windup doesnt break anything if its removed!
	slug: "level_statuses",
	name: "Level",
	type: 'target',
	desc: "'collapse beyond both yourself and the foe';'remove all statuses'",
	anim: "basic-attack",
	help: "80% REMOVE MOST STATUS EFFECTS, 15%C REMOVE WINDUP",
	usage: {
		act: "%USER REACHES OUT",
		crit: "%USER AND %TARGET FEEL SOMETHING GET TORN AWAY",
		hit: "%TARGET GETS CLAWED",
		miss: "%TARGET SWATS %USER AWAY"
	},
	accuracy: 0.8,
	crit: 0.15,
	amt: 0,
	exec: function(user, target) {
		let statusPool = []
		for (let i in env.STATUS_EFFECTS) {
			let statusData = env.STATUS_EFFECTS[i]
			let usable = true
			if(statusData.infinite && (statusData.slug != "windup")) {usable = false}
			if(statusData.passive) {usable = false}
			if(i.includes("global_")) {usable = false}
			if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false}
			if(i == "imperfect_reset") {usable = false}
			if(i == "redirection") {usable = false}
			if(i == "entropy_eternal") {usable = false}
			//console.log(i, usable)
			if(usable) statusPool.push(i)
		}
		let targetEffects = []
		target.statusEffects.forEach((status, i) => {
			//console.log(status)
			if((!status.infinite || !status.passive || !i.includes("global_")) && (statusPool.includes(status.slug))) {
				targetEffects.push(status.slug)
			}
		})
		let userEffects = []
		user.statusEffects.forEach((status, i) => {
			//console.log(status)
			if((!status.infinite || !status.passive || !i.includes("global_")) && (statusPool.includes(status.slug) && (status.slug != "windup"))) {
				userEffects.push(status.slug)
			}
		})
		targetEffects.forEach((status) => {
			if(status != "windup") removeStatus(target, status)
		})
		userEffects.forEach((status) => {
			removeStatus(user, status)
		})
		critExec: { //DOnt believe its lies this works jsut fine
			if (targetEffects.includes("windup")) {
				sendFloater({
					target: user,
					type: "arbitrary",
					arbitraryString: "LMAO",
					size: 1.5,
				})
				readoutAdd({
					message: `${target.name} forgot what it was doing.`, 
					name: "sourceless", 
					type: "sourceless combat minordetail", 
					show: false,
					sfx: false
				})
				removeStatus(target, "windup")
			}
		}
	}
},

env.ACTIONS.player_rig = {
	slug: "player_rig",
	name: "Rig Field",
	type: "target",
	desc: "'use foe resources to remove negative statuses';'chance of doubling status duration'",
	anim: "basic-attack",
	help: "'FOES:: 80%  -POSITIVE STATUS, 10%C 2*T NEGATIVE STATUS\nUSER:: 80% -NEGATIVE STATUS, 10%C 2*T POSITIVE STATUS'",
	usage: {
		act: "%USER SHUFFLES THE POWER",
		crit: "%TARGET FEELS DREAD",
		hit: "%TARGET LOOSES THEIR ENERGY",
		miss: "%USER GOT DISTRACTED"
	},
	accuracy: 0.8,
	crit: 0.1,
	amt: 0,
	exec: function(user,target) {
		let statusPool = []
		for (let i in env.STATUS_EFFECTS) {
			let statusData = env.STATUS_EFFECTS[i]
			let usable = true
			if(statusData.infinite && (statusData.slug != "windup")) {usable = false}
			if(statusData.passive) {usable = false}
			if(i.includes("global_")) {usable = false}
			if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false}
			if(i == "imperfect_reset") {usable = false}
			if(i == "redirection") {usable = false}
			if(i == "entropy_eternal") {usable = false}
			//console.log(i, usable)
			if(usable) statusPool.push(i)
		}
		let targetEffects = []
		target.statusEffects.forEach((status, i) => {
			//console.log(status)
			if((!status.infinite || !status.passive || !i.includes("global_")) && (statusPool.includes(status.slug))) {
				targetEffects.push(status)
			}
		})
		let userEffects = []
		user.statusEffects.forEach((status, i) => {
			//console.log(status)
			if((!status.infinite || !status.passive || !i.includes("global_")) && (statusPool.includes(status.slug) && (status.slug != "windup"))) {
				userEffects.push(status)
			}
		})
		targetEffects.forEach((status) => {
			if(status.beneficial) removeStatus(target, status.slug)
		})
		userEffects.forEach((status) => {
			if (!status.beneficial) removeStatus(user, status.slug)
		})
		critExec: (status) => {
			if(!status.beneficial) addStatus({target:target, status: status.slug, length: Math.floor(hasStatus(target, status.slug))})
			if(status == "windup") {
				sendFloater({
					target: target,
					type: "arbitrary",
					arbitraryString: "LMAO",
					size: 1.5,
				})
				readoutAdd({
					message: `${target.name} forgot what it was doing.`, 
					name: "sourceless", 
					type: "sourceless combat minordetail", 
					show: false,
					sfx: false
				})
				removeStatus(target, status)
			}
		}
		userEffects.forEach((status) => {
			if (status.beneficial) addStatus({target: user, status: status.slug, length: Math.floor(hasStatus(user, status.slug))})
		})
	}
},

env.ACTIONS.wild_frenzy = { //yknow this was what i thought would be the hardest thing to make
	slug: "wild_frenzy",
	name: "Frenzied Flail",
	type: 'target',
	desc: "'flail around';'a chance to keep hitting'",
	anim: "basic-attack",
	help: "100% -2HP, 15%C USE THIS ACTION AGAIN ON RANDOM TARGET",
	usage: {
		act: "%USER BEGINS TO FLAIL",
		crit: "%USER KEEPS FLAILING",
		hit: "%TARGET GETS WHACKED",
		miss: "%TARGET EVADES"
	},
	accuracy: 1,
	crit: 0.15,
	amt: 2,
	exec: function(user, target) { //stole a bit of frenzy's code,
		let action = this
		let targetTeam
		switch(user.team.name) {
			case "ally": targetTeam = env.rpg.enemyTeam; break;
			case "enemy": targetTeam = env.rpg.allyTeam; break;
		}
		let validTargets = targetTeam.members.filter(member => member.state != "dead" && member.state != "lastStand")
		if(validTargets.length) for (let i = 0; i < 1; i++) {
			if (validTargets) {
				let target = validTargets.sample()
					setTimeout(()=>{
						env.GENERIC_ACTIONS.singleTarget({
							action,
							user,
							target,
							hitSfx: { name: 'shot2' },
							critSfx: { name: 'shot6' },
							critExec: ({target})=> {
								if(target.hp > 0 && target.state != "lastStand") {
									env.setTimeout(()=>{
										useAction(user, this, target, {beingUsedAsync: true, reason: "wild_frenzy"})
									}, 200)
								}
							}
						})
					}, 200)
			}
		}
	}
},

env.ACTIONS.player_overload = { //THis will let you traumatize the firmament :]
	slug: 'player_overload',
	name: 'Exponential Surge',
	type: 'self+autohit+support',
	desc: "'focus flailing into a long barrage';'next attack is used across entire team';'long period of focus tires shell out and stuns'",
	anim: "",
	help: "+1T:FOCUSED +EXPONENTIAL SURGE",
	usage: {
		act: "%USER HONES IN"
	},
	beneficial: true,
	disableIf: (actor)=>{ if(hasStatus(actor, "fear")) return "PROHIBITED BY FEAR" },
	exec: function(user, target) {
		play("talkchoir7", 1.5)
		addStatus({target: user, status: "exp_over", length: 1, noReact:true})
		addStatus({target: user, status: "focused", length: 1, noReact:true});
		return 'nothing'
	},
	avoidChaining: true
},

env.ACTIONS.entropy_burnout = {
	slug: "entropy_burnout",
	name: "Burnout",
	type: 'target',
	desc: "'Set off their end'",
	anim: "basic-attack",
	help: "AUTOHIT, +5T BURNOUT ON TARGET",
	autohit: true,
	usage: {
		act: "%USER IGNITES THE ENERGY OF %TARGET",
		hit: "%TARGET STARTS TO BURN UP",
	},
	crit: 0,
	amt: 2,
	exec: function(user, target) {
		return env.GENERIC_ACTIONS.singleTarget({
			action: this, 
			user, 
			target,
			hitSfx: {
				name: 'chomp',
				rate: 0.7
			},
			genExec: ()=> {
				addStatus({target, origin: user, status: "burnout", length:5});
			}
		})
	}
},
//SURGING
env.ACTIONS.tormenting_delight = {
	slug: "tormenting_delight",
	name: "Tormenting delight",
	type: 'target',
	desc: "'Oh how crude!';'laugh at us more';'it only inspires us to keep hitting while you are on your last legs!'",
	anim: "basic-attack",
	help: "100% -3HP 25% +1T STUN, +SURGE USER/n20%C -6HP +2T STUN, 25% +1T STUN, +2T FOCUSED +SURGE USER",
	usage: {
		act: "%USER READIES A SWING",
		hit: "%TARGET IS STRUCK",
		crit: "%TARGET IS STUNNED",
	},
	crit: 0.2,
	amt: 3,
	exec: function(user, target) {
		let includeFocus = false
		env.GENERIC_ACTIONS.singleTarget({
			action,
			user,
			target,
			hitSfx: {
				name: 'chomp',
				rate: 0.7
			},
			critExec: ({target}) =>{
				addStatus({target: target, status: "stun", length: 2})
				includeFocus = true
			},
			genExec: ({user,target})=> {
				if (Math.random() < 0.25) {
					addStatus(user, "surge")
					addStatus({target: target, status: "stun"})
					if (includeFocus) {addStatus(user, "focus")}
				}
			}
		})
	}
},

env.ACTIONS.back_to_stage = {
	slug: "back_to_stage",
	name: "Back to stage",
	type: 'target',
	desc: "'oh not just yet!';'you cannot be unable to dance now!';'far too important for you to leave so early!'",
	help: "IF STUN: -1/2HP, +1-3T [ROT/DESTABILIZED/VULNERABLE/PUNCTURE]\nIF NO STUN: +2/3T EVASION",
	beneficial: true,
	crit: 0.3,
	amt: 1,
	exec: function(user, target) {
		let consequenceChoices =["rot", "destabilized", "vulnerable", "puncture"]
		let pickedConsequence = consequenceChoices.sample()

		env.GENERIC_ACTIONS.singleTarget({
			action,
			user,
			target,
			hitSfx: {
				name: 'chomp',
				rate: 0.7
			},
			critExec: ({target}) =>{
				if (hasStatus(target, "stun")) {
					if (pickedConsequence == "rot") {
						consequenceLength = 1
					} else {
						consequenceLength = 2
					}
					addStatus({target:target, status: pickedConsequence, length: consequenceLength})
					removeStatus(target, "stun")
				} else {
					addStatus({target: target,status: "evasion",legnth: 3})
				}
			},
			hitExec: ({target}) =>{
				if (hasStatus(target, "stun")) {
					if (pickedConsequence == "rot") {
						consequenceLength = 2
					} else {
						consequenceLength = 3
					}
					combatHit(target, {amt: 2, autohit: true, redirectable: false})
					addStatus({target: target, status: pickedConsequence, length: consequenceLength})
					removeStatus(target, "stun")
				} else {
					addStatus(target, "evasion")
				}
			}
		})
		/*if (hasStatus(target, "stun")) {
			env.GENERIC_ACTIONS.singleTarget({
				action,
				user,
				target,
				hitSfx: {
					name: 'chomp',
					rate: 0.7
				},
				critExec: ({target}) =>{
					if (pickedConsequence == "rot") {
						consequenceLength = 1
					} else {
						consequenceLength = 2
					}
					combatHit(target, {amt: 1, autohit: true, redirectable: false})
					addStatus({target:target, status: pickedConsequence, length: consequenceLength})
				},
				hitExec: ({target}) =>{
					if (pickedConsequence == "rot") {
						consequenceLength = 2
					} else {
						consequenceLength = 3
					}
					combatHit(target, {amt: 2, autohit: true, redirectable: false})
					addStatus({target: target, status: pickedConsequence, length: consequenceLength})
				},
      			genExec: ({target}) => {
					removeStatus(target, "stun")
				}
			})
		} else {
			env.GENERIC_ACTIONS.singleTarget({
				action,
				user,
				target,
				hitSfx: {
					name: 'chomp',
					rate: 0.7
				},
				critExec: ({target}) => {
					addStatus({target: target,status: "evasion",legnth: 3})
				},
				hitExec: ({target})=>{
					addStatus(target, "evasion")
				}
			})
		} */		
	}
},

env.ACTIONS.velnits_lament = {
	slug: "velnits_lament",
	name: "velnit's lament",
	type: 'support+target+self+autohit',
	desc: "'O, so my act come to an end';'a well earned break from this play!';'for you however';'must pick up the pace!'",
	help: "IF TEAMMATE: -SURGE +WILD SURGE\nIF SELF: -SURGE +WILDSURGE +1T STUN +2T VULNERABLE",
	exec: function(user,target) {
		if (hasStatus(target, "surge")) {
			removeStatus(target, "surge")
			addStatus(target,"wild_surge")
			if (target == user) {
				addStatus(user, "vulnerable")
			}
		}
	}
},

env.ACTIONS.showmanship = {
	slug: "showmanship",
	name: "SHOWMANSHIP",
	type: 'target',
	desc: "'SEE HOW THEY FALL!';'THEY THOUGHT THEY WERE LAUGHING DOWN AT US';'ONLY FOR US TO SWEEP THEIR KNEES!'",
	help: "",
	usage: {
	},
	crit: 0.2,
	amt: 2,
	exec: function(user, target) {
		hitExec: ({user,target}) =>{
			let action = this
			let targetTeam
			switch(user.team.name) {
				case "ally": targetTeam = env.rpg.enemyTeam; break;
				case "enemy": targetTeam = env.rpg.allyTeam; break;
			}
			let validTargets = targetTeam.members.filter(member => member.state != "dead" && member.state != "lastStand")
			if(validTargets.length) for (let i = 1; i <=3; i++) {
				if (validTargets) {
					let target = validTargets.sample()
					setTimeout(()=>{
						env.GENERIC_ACTIONS.singleTarget({
							action,
							user,
							target,
							hitSfx: { name: 'shot2' },
							critSfx: { name: 'shot6' },
						})
					}, 500)
				}
			}
		}
		critExec: ({target}) => {
			env.GENERIC_ACTIONS.teamWave({
				team: target.team,
				exec: (actor, i) => {
					if(actor == target) return; // we skip the original target
					useAction(user, action, actor, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "exponential overload"})
				}
			})
		}
	}
},

env.ACTIONS.method_acting = {
	slug: "method_acting",
	name: "BREAKS END",
	type: 'autohit',
	desc: "'STARVED THIN AND CHITTIN SCATTERED';'YOU MUST CONTINUE!';'VELZIE DEMANDS! VELZIE COMMANDS!'",
	help: "",
	exec: function(user,target) {
		let consequenceChoices =["rot", "destabilized", "vulnerable", "puncture"]
		let pickedConsequence = consequenceChoices.sample()
		if (hasStatus(target, "stun")) {
			env.GENERIC_ACTIONS.singleTarget({
				action,
				user,
				target,
				hitSfx: {
					name: 'chomp',
					rate: 0.7
				},
				critExec: ({target}) =>{
					if (pickedConsequence == "rot") {
						consequenceLength = 1
					} else {
						consequenceLength = 2
					}
					combatHit(target, {amt: 1, autohit: true, redirectable: false})
					addStatus({target:target, status: pickedConsequence, length: consequenceLength})
				},
				hitExec: ({target}) =>{
					if (pickedConsequence == "rot") {
						consequenceLength = 2
					} else {
						consequenceLength = 3
					}
					combatHit(target, {amt: 2, autohit: true, redirectable: false})
					addStatus({target: target, status: pickedConsequence, length: consequenceLength})
				},
				genExec: ({target}) => {
					removeStatus(target, "stun")
				}
			})
			} else {
				env.GENERIC_ACTIONS.singleTarget({
					action,
					user,
					target,
					hitSfx: {
						name: 'chomp',
						rate: 0.7
					},
					critExec: ({target}) => {
						addStatus({target: target,status: "evasion",legnth: 3})
					},
				hitExec: ({target})=>{
					addStatus(target, "evasion")
				}
			})
		}
	}
},

env.ACTIONS.sacrificial_act = {
	slug: "sacrifical_act",
	name: "Sacrifical Act",
	type: 'autohit+target',
	desc: "'LET THE SHOW GO FORTH! AGAIN!';'LET VELZIE VIEW OUR CRUDE IMMITATIONS';'FOR THAT WILL ONLY INSPIRE US MORE!'",
	help: "IF TARGET HAS SURGE, -SURGE +WILDSURGE +1T EMPOWERED +2T FOCUSED/nIF ON SELF:-4HP,+2T FEAR, +1T STUN, +1T VULNERABLE +1T WILD",
	exec: function(user,target){
		if (target == user) {
			env.GENERIC_ACTIONS.singleTarget({
				action,
				user,
				target,
				hitSfx: {
					name: 'chomp',
					rate: 3
				},
				genExec: ({user}) => {
					combatHit(user, {amt:4, autohit: true, redirectable:false})
					if (hasStatus(user,"surge")) {
						removeStatus(user,"surge")
					}
					addStatus(user,"wild_surge")
					addStatus({target: user, status:"fear", length:2})
					addStatus(user, "stun")
					addStatus(user, "vulnerable")
				}
			})
		} else {
			env.GENERIC_ACTIONS.singleTarget({
				action,
				user,
				target,
				hitSfx: {
					name: 'chomp',
					rate: 0.7
				},
				genExec: ({target}) => {
					combatHit(user, {amt:4, autohit:true, redirectable:false})
					if (hasStatus(target,"surge")) {
						removeStatus(target,"surge")
						addStatus(target,"wild_surge")
					}
					addStatus({target: target, status: "empowered", length: 2})
					addStatus({target: target, status: "focused", length: 3})
				}
			})
		}
	}
}

//Merchant code
for (const componentName of ["entropy"]) { // this probably isn't a function but i don't know where else to put it
     const component = env.COMBAT_COMPONENTS[componentName]
     let commerceObject = ({
          type: "humor",
          name: `${component.name.replace("Humor of ", "")}`,
          subject: component,
          value: 1,
 
          showSellIf: ()=> env.e3a2.mTotals[componentName].available > 0,
          sellExec: ()=>{
               addItem("sfer_cube")
               page.flags.components[componentName]--
               env.e3a2.mTotals = CrittaMenu.getTotals()
               env.commerceNotice = `exchanged ${component.name} for 1 ${env.ITEM_LIST['sfer_cube'].name}`
          },
     })
     env.e3a2.merchant.sellResponses.replies.push({
          name: `${commerceObject.name}::${commerceObject.value}S`,
          destination: "sell",
          hideRead: true,
          showIf: commerceObject.showSellIf,
          class: `commerce-${commerceObject.type}`,
          definition: `NOTE::'exchange for ${commerceObject.value} ${env.ITEM_LIST['sfer_cube'].name}'`,
          exec: ()=> {commerceObject.sellExec(); env.e3a2.mTotals = CrittaMenu.getTotals(); env.e3a2.updateExchangeScreen()}
     })
     env.e3a2.merchant.commerce.push(commerceObject)
}
for (const componentName of ["surging"]) {
     const component = env.COMBAT_COMPONENTS[componentName]
     let commerceObject = ({
          type: "humor",
          name: `${component.name.replace("Humor of ", "")}`,
          subject: component,
          value: 1,
 
          showSellIf: ()=> env.e3a2.mTotals[componentName].available > 0,
          sellExec: ()=>{
               addItem("sfer_cube")
               page.flags.components[componentName]--
               env.e3a2.mTotals = CrittaMenu.getTotals()
               env.commerceNotice = `exchanged ${component.name} for 1 ${env.ITEM_LIST['sfer_cube'].name}`
          },
     })
     env.e3a2.merchant.sellResponses.replies.push({
          name: `${commerceObject.name}::${commerceObject.value}S`,
          destination: "sell",
          hideRead: true,
          showIf: commerceObject.showSellIf,
          class: `commerce-${commerceObject.type}`,
          definition: `NOTE::'exchange for ${commerceObject.value} ${env.ITEM_LIST['sfer_cube'].name}'`,
          exec: ()=> {commerceObject.sellExec(); env.e3a2.mTotals = CrittaMenu.getTotals(); env.e3a2.updateExchangeScreen()}
     })
     env.e3a2.merchant.commerce.push(commerceObject)
}
