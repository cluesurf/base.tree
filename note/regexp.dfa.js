/**************************************************/
/**                   Imports                    **/
/**************************************************/
var HashMap = require('hashmap');

/**************************************************/
/**                  Constructor                 **/
/**************************************************/
/**
 * Constructor:
 * Number is the identifier of the state.
 * Accepting is a boolean stating whether the state is accepting or not.
 */
var State = function(number, accepting){
    this.next = new HashMap();
    this.nr = number;
    this.accepting = accepting;
    this.identifier = undefined;
};

/**************************************************/
/**                    Methods                   **/
/**************************************************/
/**
 * Method returning the number of the state.
 */
State.prototype.getNumber = function(){
    return this.nr;
};

/**
 * Method stating whether the state is accepting.
 */
State.prototype.isAccepting = function(){
    return this.accepting;
};

/**
 * Method returning the identifier of the state.
 */
State.prototype.getIdentifier = function(){
    return this.identifier;
};

/**
 * Method to set the identifier,
 * @param override: if true, it overrides current identifier, otherwise it throws an error.
 */
State.prototype.setIdentifier = function(identifier, override){
    if(identifier === undefined)
        return;
    if(this.identifier !== undefined && this.identifier !== identifier && override !== true)
        throw 'Unable to add identifier ' + identifier + ', state already has identifier: ' + this.identifier;
    else
        this.identifier = identifier;
};

/**
 * Method to add transition to next state.
 * Overrides previous transition existing equivalent transition.
 */
State.prototype.addNext = function(transition, state, identifier){
    transition = new RegExp('^' + transition.source + '$');

    switch(true){
        /** Case of existing transition to self. **/
        case this.__isDefinedSelf__(transition):
            if(state === this){
                state.setIdentifier(identifier);
                return state;
            }else
                throw 'Violation of determinism: \'' + transition.source.substring(1, transition.source.length-1) + '\' already defined to self.';

        /** Case of existing wildcard transition. **/
        case this.__isDefinedWildcard__(transition):
            throw 'Violation of determinism: wildcard \'.\' clashes with other transitions.';

        /** Case of existing transition. **/
        case this.__isDefined__(transition):
            if(state.isAccepting()){
                this.getNext(transition.source.substring(1, transition.source.length-1)).accepting = true;
                this.getNext(transition.source.substring(1, transition.source.length-1)).setIdentifier(identifier);
            }
            if(this.getNext(transition.source.substring(1, transition.source.length-1)) === undefined)
                return this.next.get(transition);
            return this.getNext(transition.source.substring(1, transition.source.length-1));

        /** Case of set containing existing transition. **/
        case this.__isPartleyDefined__(transition):
            throw 'Violation of determinism: \'' + transition.source.substring(1, transition.source.length-1) + '\' already defined.';

        /** Case of existing transition in set. **/
        case this.__isDefinedInSet__(transition):
            throw 'Violation of determinism: ' + transition.source.substring(1, transition.source.length-1) + ' already defined in set.';

        /** Normal case. **/
        default:
            this.next.set(transition, state);
            state.setIdentifier(identifier);
            return state;
    }
};

/**
 * Method to check whether the state has a next state for given transition.
 */
State.prototype.hasNext = function(transition){
    for(var key of this.next.keys()){
        if(key.test(transition)){
            return true;
        }
    }
    return false;
};

/**
 * Method to get the next state after doing given transition.
 */
State.prototype.getNext = function(transition){
    if(!this.hasNext(transition)){
        return undefined;
    }else
        for(var key of this.next.keys()){
            if(key.test(transition))
                return this.next.get(key);
        }
};

/**
 * Method to print state.
 */
State.prototype.toString = function(){
    var trans = "State " + this.nr + " (Accepting = " + this.accepting + "):\n";
    for(var index in this.next.keys()){
        trans = trans.concat('  ' + this.next.keys()[index].source.substring(1, this.next.keys()[index].source.length-1) + ' -> ' + this.next.values()[index].nr + '\n');
    }
    return trans.substr(0, trans.length - 1);
};

/**************************************************/
/**               Private Methods                **/
/**************************************************/
/**
 * Check if transition is already specified to self.
 */
State.prototype.__isDefinedSelf__ = function(transition){
    return this.next.get(transition) === this;
};

/**
 * Check if wildcard '.' is already defined as a transition.
 * Or transition is wildcard and other transitions are already defined.
 */
State.prototype.__isDefinedWildcard__ = function(transition){
    return this.next.get(new RegExp(/^.$/)) !== undefined || (transition.source === '^.$' && this.next.count() !== 0);
};

/**
 * Check if transition is already specified
 */
State.prototype.__isDefined__ = function(transition){
    return this.next.get(transition) !== undefined;
};

/**
 * Check if (part of) transition is already specified as next transition.
 */
State.prototype.__isPartleyDefined__ = function(transition){
    switch(true){
        /** Case where entire transition is already defined. **/
        case this.__isDefined__(transition):
            return true;

        /** Case where transition is set. **/
        case transition.source.startsWith('^['):
            for(var trans of this.next.keys()){
                if(trans.source.startsWith('^[') && __hasOverlapExp__(trans, transition))
                    return true;
                else if(__containsCharExp__(transition, trans))
                    return true;
            }
            return false;

        /** Case where transition or part of transition is not yet defined. **/
        default:
            return false;
    }
};

/**
 * Check if transition is already defined within other sets.
 */
State.prototype.__isDefinedInSet__ = function(transition){
    var set = transition.source.startsWith('^[');

    for(var entry of this.next.keys()){
        if(entry.source.startsWith('^[')){
            if(set && __hasOverlapExp__(entry, transition))
                return true;
            else if(!set && __containsCharExp__(entry, transition))
                return true;
        }
    }
    return false;
};

/**
 * Check if set contains char.
 */
var __containsCharExp__ = function(set, char){
    return __containsChar__(set.source.substring(1, set.source.length-1), char.source.substring(1, char.source.length-1));
};

/**
 * Check if set contains char.
 */
var __containsChar__ = function(set, char){
    if(char === '\\')
        char = '\\\\';
    else if(char === '-')
        char = '\\-';
    return __hasOverlap__(set, '['+ char + ']');
};

var __hasOverlapExp__ = function(setA, setB){
    return __hasOverlap__(setA.source.substring(1, setA.source.length-1), setB.source.substring(1, setB.source.length-1));
};

/**
 * Check if sets have overlap.
 */
var __hasOverlap__ = function(setA, setB){

    var SetA = new Set();
    var SetB = new Set();

    for(var i = 1; i < setA.length-1; i++)
        switch(true){
            case setA[i] === '\\':
                SetA.add(setA[i+1]);
                i++;
                break;
            case setA[i+1] === '-':
                SetA.add([setA[i], setA[i+2]]);
                i += 2;
            default:
                SetA.add(setA[i]);
                break;
        }

    for(i = 1; i < setB.length-1; i++)
        switch(true){
            case setB[i] === '\\':
                SetB.add(setB[i+1]);
                i++;
                break;
            case setB[i+1] === '-':
                SetB.add([setB[i], setB[i+2]]);
                i += 2;
            default:
                SetB.add(setB[i]);
                break;
        }

    var shortest = SetA.size < SetB ? SetA : SetB;
    var longest = SetA.size < SetB ? SetB : SetA;

    /** Check if in range **/
    for(var shortestItem of shortest.values()){
        if(shortestItem instanceof Array){
            var smallest = shortestItem.sort();
            var largest = smallest[1];
                smallest = smallest[0];

            for(var longestItem of longest.values()){
                if(longestItem instanceof Array){
                    var smallestLong = longestItem.sort();
                    var largestLong = smallestLong[1];
                        smallestLong = smallestLong[0];

                    if(smallest <= largestLong && largest >= smallestLong)
                        return true;
                }else{
                    if(longestItem >= smallest && longestItem <= largest)
                        return true;
                }
            }
        }
    }

    for(shortestItem of longest.values()){
        if(shortestItem instanceof Array){
            smallest = shortestItem.sort();
            largest = smallest[1];
            smallest = smallest[0];

            for(longestItem of shortest.values()){
                if(longestItem instanceof Array){
                    smallestLong = longestItem.sort();
                    largestLong = smallestLong[1];
                        smallestLong = smallestLong[0];

                    if(smallest <= largestLong && largest >= smallestLong)
                        return true;
                }else{
                    if(longestItem >= smallest && longestItem <= largest)
                        return true;
                }
            }
        }
    }

    for(var char of shortest.values()){
        if(longest.has(char))
            return true;
    }
    return false;
};

/**************************************************/
/**                   Export                     **/
/**************************************************/
exports.State = State;

/**************************************************/
/**                 Constructor                  **/
/**************************************************/
/**
 * Creates DFA from regex and possible initial state.
 */
var DFA = function(regex, identifier, initial){
    this.ID = 0;
    this.initial = this.scan(regex, identifier, initial);
};

/**************************************************/
/**                 Constants                    **/
/**************************************************/
var ESCAPED     = 'ESCAPED';
var REGULAR     = 'REGULAR';
var SET         = 'SET';
var PLUS        = 'PLUS';
var STAR        = 'STAR';
var QUANTIFIER  = 'QUANTIFIER';
var OPTIONAL    = 'OPTIONAL';
var ALTERNATION = 'ALTERNATION';
var GROUP       = 'GROUP';

/**************************************************/
/**                 Functions                    **/
/**************************************************/
/**
 * Method to retrieve the number of nodes in the DFA.
 */
DFA.prototype.size = function(){
    return this.ID;
};

/**
 * Method stating whether given input yields accepting state.
 */
DFA.prototype.accepts = function(transitions){
    var currentState = this.initial;
    for(var transition in transitions){
        if (currentState === undefined)
            break;
        currentState = currentState.getNext(transitions[transition]);
    }
    if(currentState === undefined)
        return false;
    else{
        return currentState.isAccepting();
    }
};

/**
 * Method returning the identifier of accepting state
 * or undefined if no accepting state wasfound.
 */
DFA.prototype.acceptingID = function(transitions){
    var currentState = this.initial;
    for(var transition in transitions){
        if (currentState === undefined)
            break;
        currentState = currentState.getNext(transitions[transition]);
    }
    if(currentState === undefined)
        return undefined;
    else{
        return currentState.getIdentifier();
    }
};

/**
 * Method to add additional regex to DFA.
 */
DFA.prototype.add = function(regex, identifier){
    this.initial = this.scan(regex, identifier, this.initial);
    return this;
};

/**
 * Method to create DFA initial state from regex
 * and possible existing initial state.
 */
DFA.prototype.scan = function(regex, identifier, initial){
    return this.__createDFA__(
           /** Set final booleans **/
           __setFinal__(
           /** Handle or instances **/
           __handleOr__(
           /** Combine quantifiers with their expression **/
           __combineQuantifiers__(
           /** First tokenise regular expression **/
           __tokenise__(regex)))), initial, identifier);
};

/**************************************************/
/**      Private Functions - Construct DFA       **/
/**************************************************/
/**
 * Method to create DFA from the mess that was made from all previous methods.
 * Reference:
 * Token            = [0]
 * Type             = [1]
 * Quantifier       = [2]
 * Quantifier Type  = [3]
 * Final            = [4]
 */
DFA.prototype.__createDFA__ = function(tokens, initial, identifier){
    var entry = null;

    if(initial === undefined)
        initial = new State(this.getID(), false);

    var current = undefined;

    /** Loop over traces in tokens **/
    for(var trace of tokens){
        /** Reset current state to initial state for new trace. **/
        current = initial;

        for(var index = 0; index < trace.length; index++){
            entry = trace[index];

            switch(entry[1]){

                /** Handle group TODO**/
                case GROUP:
                    switch(entry[3]){

                        /** Handle PLUS **/
                        case PLUS:
                            //TODO
                            throw 'GROUPs with PLUS quantifier are currently not supported.';

                        /** Handle STAR **/
                        case STAR:
                            //TODO
                            throw 'GROUPs with STAR quantifier are currently not supported.';

                        /** Handle QUANTIFIER **/
                        case QUANTIFIER:
                            //TODO
                            throw 'GROUPs with QUANTIFIER quantifier are currently not supported.';

                        /** Handle OPTIONAL **/
                        case OPTIONAL:
                            //TODO
                            throw 'GROUPs with OPTIONAL quantifier are currently not supported.';

                        /** Method for handeling regular groups, i.e. without quantifiers. **/
                        default:
                            //TODO
                            throw 'GROUPs are currently not supported.';
                    }

                /** Handle single case **/
                default:
                    switch(entry[3]){

                        /** Handle PLUS **/
                        case PLUS:
                            current = this.__addPlus__(current, entry, identifier);
                            break;

                        /** Handle STAR **/
                        case STAR:
                            current = this.__addStar__(current, entry, identifier);
                            break;

                        /** Handle QUANTIFIER **/
                        case QUANTIFIER:
                            current = this.__addQuantifier__(current, entry[2], trace, index, identifier);
                            return initial;

                        /** Handle OPTIONAL **/
                        case OPTIONAL:
                            current = this.__addOptional__(current, trace, index, identifier);
                            return initial;

                        /** Method for handling regular chars, i.e. without quantifiers. **/
                        default:
                            current = this.__addRegular__(current, entry, identifier);
                    }
            }
        }
    }
    return initial;
};

/**
 * Method to add QUANTIFIER quantified char to DFA
 */
DFA.prototype.__addQuantifier__ = function(current, quantifier, trace, index, identifier){
    /** Retrieve minimum and maximum quantifier from quantifier. **/
    var min = __quantifierParameters__(quantifier);
    var max = min[1];
        min = min[0];

    /** Initialise remaining trace to everything after current index. **/
    var remainingTrace = trace.splice(index+1, trace.length);

    if(min === 0)
        current = this.__createDFA__([remainingTrace], current, identifier);

    /** Add character of current index 'min' times to current state. **/
    for(var i = 0; i < min-1; i++){
        current = this.__addRegular__(current, trace[index], identifier);
    }

    /** Add character and remaining trace 'max'-'min' times to current state. **/
    for(i; i < max; i++){
        current = this.__addRegular__(current, trace[index], identifier);
        current = this.__createDFA__([remainingTrace], current, identifier);
    }

    /** Return current state. **/
    return current;
};

/**
 * Method to add OPTIONAL quantified char to DFA
 */
DFA.prototype.__addOptional__ = function(current, trace, index, identifier){
    return this.__addQuantifier__(current, '{0,1}', trace, index, identifier);
};

/**
 * Method to add STAR quantified char to DFA
 */
DFA.prototype.__addStar__ = function(current, entry, identifier){
    if(entry[4])
        current.accepting = entry[4];
    else
        identifier = undefined;
    return current.addNext(new RegExp(entry[0]), current, identifier);
};

/**
 * Method to add PLUS quantified char to DFA
 */
DFA.prototype.__addPlus__ = function(current, entry, identifier){
    var next = new State(this.getID(), entry[4]);
    next = current.addNext(new RegExp(entry[0]), next, identifier);
    return next.addNext(new RegExp(entry[0]), next);
};

/**
 * Method to add regular char to DFA,
 * i.e. no quantifier.
 */
DFA.prototype.__addRegular__ = function(current, entry, identifier){
    var next = new State(this.getID(), entry[4]);
    return current.addNext(new RegExp(entry[0]), next, identifier);
};

/**
 * Method to retrieve current ID and increment it.
 */
DFA.prototype.getID = function(){
    this.ID++;
    return this.ID-1;
};

/**************************************************/
/**   Private Functions - quantifier params      **/
/**************************************************/
/**
 * Method to get minimum and maximum parameters from quantifier
 */
var __quantifierParameters__ = function(quantifier){
    var res = quantifier
              .substring(1, quantifier.length-1)
              .split(',')
              .map(function(elem){return parseInt(elem, 10)})
              .sort();

    if(res.length === 1)
        res[1] = res[0];
    return res;
};

/**************************************************/
/**        Private Functions - Set Final         **/
/**************************************************/
/**
 * Method to set final boolean
 */
var __setFinal__ = function(tokens, final){
    switch(final){

        /** If no final argument is given we assume there can still exist a final. **/
        case undefined:
            final = true;

        /** Case where final is true, i.e. still possible for a final to occur. **/
        case true:
            for(var path of tokens){
                final = true;
                for(var i = path.length-1; i >= 0; i--){
                    path[i] = [path[i][0], path[i][1], path[i][2], path[i][3], final];

                    /** If group found **/
                    if(path[i][0] instanceof Array)
                        path[i][0] = __setFinal__(path[i][0], final);

                    if(__isFinalQuantifier__(path[i][3])){
                        final = false;
                    }
                }
            }
            break;

        /** Case where final is false, i.e. not possible for a final to occur. **/
        default:
            for(path of tokens){
                for(i = 0; i < path.length; i++){
                    path[i] = [path[i][0], path[i][1], path[i][2], path[i][3], false];

                    /** If group found **/
                    if(path[i][0] instanceof Array)
                        path[i][0] = __setFinal__(path[i][0], false);
                }
            }
    }

    return tokens;
};

/**
 * Method returning whether quantifier is final.
 */
var __isFinalQuantifier__ = function(quantifier){
    return quantifier === undefined || quantifier === PLUS || quantifier === QUANTIFIER;
};

/**************************************************/
/**       Private Functions - Or instances       **/
/**************************************************/
/**
 * Method to handle or instances.
 */
var __handleOr__ = function(tokens){
    var result = [];
    var current = [];

    for(var token of tokens){
        switch(token[1]){

            /** Group found **/
            case GROUP:
                current.push([__handleOr__(token[0]), token[1], token[2], token[3]]);
                break;

            /** Or found **/
            case ALTERNATION:
                result.push(current);
                current = [];
                break;

            /** Regular case **/
            default:
                current.push(token);
        }
    }

    result.push(current);
    return result;
};

/**************************************************/
/**   Private Functions - Combine Quantifiers    **/
/**************************************************/
/**
 * Method to combine quantifiers with their token.
 * Creates a tuple [token, type, quantifier, quantifierType]
 * Reference:
 * Token            = [0]
 * Type             = [1]
 * Quantifier       = [2]
 * Quantifier Type  = [3]
 * Note that quantifiers are: PLUS, STAR, QUANTIFIER, and OPTIONAL.
 */
var __combineQuantifiers__ = function(tokens){
    var result = [];

    var types = tokens[1];
        tokens = tokens[0];

    for(var i = 0; i < tokens.length; i++){
        switch(true){
            /** Case of group and quantifier **/
            case tokens[i] instanceof Array && __isQuantifier__(types[i+1]):
                result.push([__combineQuantifiers__([tokens[i], types[i]]),
                             GROUP,
                             tokens[i+1],
                             types[i+1]
                            ]);
                i++;
                break;

            /** Case of group only **/
            case tokens[i] instanceof Array:
                result.push([__combineQuantifiers__([tokens[i], types[i]]),
                             GROUP,
                             undefined,
                             undefined
                            ]);
                break;

            /** Case of no group with quantifier **/
            case __isQuantifier__(types[i+1]):
                result.push([tokens[i],
                             types[i],
                             tokens[i+1],
                             types[i+1]
                            ]);
                i++;
                break;

            /** Case of no group only **/
            default:
                result.push([tokens[i],
                             types[i],
                             undefined,
                             undefined
                            ]);
                break;
        }
    }

    return result;
};

/**
 * Method stating whether tokentype is quantifier,
 * i.e. equals PLUS || STAR || QUANTIFIER || OPTIONAL;
 */
var __isQuantifier__ = function(type){
    return type === PLUS || type === STAR || type === QUANTIFIER || type === OPTIONAL;
};

/**************************************************/
/**        Private Functions - Tokenise          **/
/**************************************************/
/**
 * Method to tokenise regular expression in preparation for DFA.
 * Returns tokens in form of {tokens: ..., types: ...};
 */
var __tokenise__ = function(regex){
    regex = regex.source;

    var tokens = [];
    var tokenTypes = [];

    while(regex.length > 0){
        switch(true){

            /** Case of escape character **/
            case regex[0] === '\\':
                var res = __handleEscape__(regex.substring(0, 6));
                tokens.push(res);
                tokenTypes.push(ESCAPED);
                regex = regex.replace(res, '');
                break;

            /** Case of set **/
            case regex[0] === '[':
                res = __handleSet__(regex);
                tokens.push(res);
                tokenTypes.push(SET);
                regex = regex.replace(res, '');
                break;

            /** Case of quantifiers or alternation **/
            case /^[+*?|]/.test(regex) ||
                 /^\{\d+(,\d+)?\}/.test(regex):
                res = __handleQuantifier__(regex);
                tokens.push(res[0]);
                tokenTypes.push(res[1]);
                regex = regex.replace(res[0], '');
                break;

            /** Case of group **/
            case regex[0] === '(':
                res = __handleGroup__(regex);
                tokens.push(res[1]);
                tokenTypes.push(res[2]);
                regex = regex.replace(res[0], '');
                break;

            /** Case of regular character **/
            default:
                tokens.push(regex[0]);
                tokenTypes.push(REGULAR);
                regex = regex.substring(1);
        }
    }

    return [tokens, tokenTypes];
};

/**
 * Method to handle escape characters
 */
var __handleEscape__ = function(string){
    switch(true){
        case /\\\d\d\d/.test(string) &&
             parseInt(string.substring(1, 4), 8) >= 0 &&
             parseInt(string.substring(1, 4), 8) <= 255:
            return string.substring(0, 4);
        case /\\x[0-9a-fA-F]{2}/.test(string):
            return string.substring(0, 4);
        case /\\u[0-9a-fA-F]{4}/.test(string):
            return string.substring(0, 6);
        case /\\c[A-Z]/.test(string):
            return string.substring(0, 3);
        case /\\[tnvfr0.\\+*?^$[\]{}()|/]/.test(string):
            return string.substring(0, 2);
        default:
            return string.substring(1, 2);
    }
};

/**
 * Method to handle character set
 */
var __handleSet__ = function(string){
    var res = '';
    for(var char = 0; char < string.length; char++){
        switch(string[char]){
            case '\\':
                res += '\\';
                res += string[char+1];
                char++;
                break;
            case ']':
                res += string[char];
                return res;
            default:
                res += string[char];
        }
    }
    return res;
};

/**
 * Method to handle quantifiers and alternation symbols
 */
var __handleQuantifier__ = function(string){
    switch(string[0]){
        case '+':
            return [string[0], PLUS];
        case '*':
            return [string[0], STAR];
        case '?':
            return [string[0], OPTIONAL];
        case '|':
            return [string[0], ALTERNATION];
        default:
            return [string.match(/^\{\d+(,\d+)?\}/)[0], QUANTIFIER];
    }
};

/**
 * Method to handle group
 */
var __handleGroup__ = function(string){
    string = string.substring(1);
    var group = '';
    var depth = 1;
    for(var char = 0; char < string.length; char++){
        if(depth === 0)
            break;
        else if(string[char] === '\\'){
            group += string[char] + string[char + 1];
            char++;
            continue;
        }else if(string[char] === '('){
            depth++;
        }else if(string[char] === ')'){
            depth--;
        }
        group += string[char];
    }
    group = group.substring(0, group.length-1);

    var tokenised = __tokenise__(new RegExp(group));

    return ['(' + group + ')', tokenised[0], tokenised[1]];
};

/**************************************************/
/**                   Export                     **/
/**************************************************/
exports.DFA = DFA;
