const patternDict = [{
    pattern : '\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent : 'Hello'
    }, {
    pattern :'\\b(bye|exit|Exit)\\b',
    intent : 'Exit'
    }, {
    pattern :'\\b(how are you?|How are you?|how are you)\\b',
    intent : 'Good, you?'
    }, {
    pattern :'\\b(Good|Great|Good!|Great!)\\b',
    intent : 'Nice to hear!'
    }, {
    pattern : '(\\w+\\s+){0,10}\\b(?<statistic>tall|weight|position|team|conference|division)\\b\\s+\\b(?<player>(\\w+(\\s+\\w+))|\\w+)\\b\\s+\\w+',
    intent : 'PlayerInfo',
    entities : {
        statistic: '',
        player:''
    }
}];

module.exports = patternDict;