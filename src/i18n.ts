import { createI18n } from 'vue-i18n'

export const inter = createI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        welcome: 'Welcome to UBB!',
        loginWithGoogle: 'Log in with Google',
        logout: 'Log out',
        restart: 'Restart',
        numberOfPlayers: 'Players',
        ubb: 'UBB',
        longUbb: 'Long UBB',
        longerUbb: 'Longer UBB',
        ok: 'Ok',
        close: 'Close',
        saved: 'Game saved. Statistics available above.',
        name: 'Name',
        sum: 'Sum',
        save: 'Save results',
        illegalPoints: 'Points must be divisible by 5.',

        instructions: 'Instructions',
        whatIsUbb: 'What is UBB?',
        sevenSets: 'Seven sets',
        goal: 'Goal',
        sets: 'Sets',
        buying: 'Buying',
        jokers: 'Jokers',
        counting: 'Counting points',
        ubbIs: 'UBB is a card game in which you build trios and straights',
        trio: 'Trios',
        threeOrMore: 'three or more cards with the same rank, e.g.',
        or: 'or',
        straight: 'Straights',
        fourOrMore: 'four or more cards with the same suit in rank order, e.g.',
        ubbIsPlayedInSevenSeries:
          'UBB is played in seven sets. In each set, one must build different series',
        set: 'Set',
        dealtCards: 'Dealt cards:',
        description: 'Description',
        example: 'Example',
        twoTrios: 'Two trios',
        oneTrioAndOneStraight: 'One trio and one straight',
        twoStraights: 'Two straights',
        threeTrios: 'Three trios',
        twoTriosAndOneStraight: 'Two trios and one straight',
        oneTrioAndTwoStraight: 'One trio and two straights',
        threeStraights: 'Three straights',
        theGoalIs:
          'The goal in UBB is to collect as few points as possible in each set. The winner is the player who collected the least points when all the sets are played. See the point counting rules',
        below: 'below',
        discardPile: 'discard pile',
        drawPile: 'draw pile',
        setsArePlayedThus: 'The sets are played as follows',
        setsArePlayedThus1_1:
          'The dealer deals cards to the players and puts the rest of the cards (called ',
        setsArePlayedThus1_2:
          ') in the middle of the table. The dealer then turn the upmost card and puts it beside the draw pile, in a new pile (called ',
        setsArePlayedThus1_3: ').',
        setsArePlayedThus2:
          'The player who sits to the left of the dealer start their turn by lifting a card, either the upmost from the draw pile or from the discard pile.',
        setsArePlayedThus3:
          'The player may now, if they can and desire to, lay down the required combination of trios and straights on the table in front of them (so called ',
        setsArePlayedThus3_1: "playing one's cards",
        setsArePlayedThus3_2: ').',
        setsArePlayedThus4:
          'Lastly, the player discards a card in the discard pile. After that, it is the next players turn.',
        setsArePlayedThus5: 'The set continues until one player has no cards left.',
        setsArePlayedThus6:
          'At the end of the set, every player counts their points and registers them in the table. Then the next set begins, and the new dealer is the one sitting to the left of the old dealer.',
        buying1:
          'When a player discards a card in the discard pile, before the next player has drawn a card, every other player gets a chance to buy the most recent thrown card. That card may only be bought if the player whose turn it is does not want it. The player to the left of this player has first dibs, then the next to the left etcetera. When one buys a card from the discard pile, they get to draw an extra card from the draw pile as a payment.',
        buying2_1: 'The player who just discarded a cart may also but it. (also known as ',
        buying2_2: 'buying back',
        buying2_3:
          " the card). One reason for doing so is if a player doesn't have a suitable card to discard. That player is, however, last in priority, and if another player wants to buy that card, they can get it instead.",
        buying3:
          'A player who has played their cards (that is laid down the required combination of trio and straights) may no longer buy any cards.',
        jokers1: 'Jokers can be used as replacements for any card in a series, e.g.',
        jokers2:
          'A series can contain one joker at most. When a player has played their cards, they can replace a joker that another player had used in a straight if they have the corresponding card in their hand. That idle joker can be used in the same series or in another one. However, the "one joker per serie" rule must be followed nonetheless.',
        counting1:
          'At the end of the set, that is when one player has no cards left in their hand, all of the other players count their points. This is done by converting the remaining cards they have in their hands to points using the table below, and then summing them up.',
        cards: 'Cards',
        pointsHeader: 'Points',
        tenJackQueenAndKing: 'Ten, jack, queen and king',
        ace: 'Ace',
        joker: 'Joker',
        jokerSubstitute:
          'Joker substitute - if a player has a card in their hand, which another player has replaced with a joker in one of their straights, then this card is worth as much as a joker, that is 50 points',

        statistics: 'Statistics',
        players: 'Players',
        gameHistory: 'Game History',
        winningLeague: 'Winning League',
        times: 'times',
        points: 'p',
        lowestWinningPoints: 'Lowest Winning Points',
        pointLeague: 'Point League',
        highestHand: 'Highest Hand',
        mostPlayed: 'Most Games Played',
        highestDiff: 'Highest Diff',
        numberOfGames: 'Number of Games',
        weekday: 'Weekday',
        choosePlayer: 'Choose player',
        maxPoints: 'Max Points',
        averagePoints: 'Average Points',
        minPoints: 'Minimum Points',
        placements: 'Placements',
        setMasters: 'Set masters',

        resetCertainty: 'Are you certain you want to restart?',
        reset: 'Restart',
        resetLevel0: 'No',
        resetLevel1: 'Slightly',
        resetLevel2: 'Quite',
        resetLevel3: 'Mostly',
        resetLevel4: 'Very'
      }
    },
    sv: {
      message: {
        welcome: 'Välkommen till UBB!',
        loginWithGoogle: 'Logga in med Google',
        logout: 'Logga ut',
        restart: 'Starta om',
        numberOfPlayers: 'Spelare',
        ubb: 'UBB',
        longUbb: 'Lång UBB',
        longerUbb: 'Längre UBB',
        ok: 'Ok',
        close: 'Stäng',
        saved: 'Spelet är sparat. Statistiken finns ovan.',
        name: 'Namn',
        sum: 'Summa',
        save: 'Spara resultat',
        illegalPoints: 'Poäng måste vara delbara med 5.',

        instructions: 'Instruktioner',
        whatIsUbb: 'Vad är UBB?',
        sevenSets: 'Sju omgångar',
        goal: 'Mål',
        sets: 'Spelomgångar',
        buying: 'Köpa',
        jokers: 'Jokrar',
        counting: 'Poängräkning',
        ubbIs: 'UBB är ett kortspel där man bildar trissat och stegar',
        trio: 'Trissar',
        threeOrMore: 'tre eller flera kort med samma valör, t ex',
        or: 'eller',
        straight: 'Stegar',
        fourOrMore: 'fyra eller flera kort med samma färg i ordningsföljd, t ex',
        ubbIsPlayedInSevenSeries:
          'UBB spelas i sju omgångar. I varje omgång ska man bilda olika antal serier',
        set: 'Omgång',
        dealtCards: 'Utdelade kort',
        description: 'Beskrivning',
        example: 'Exempel',
        twoTrios: 'Två trissar',
        oneTrioAndOneStraight: 'En triss och en stege',
        twoStraights: 'Två stegar',
        threeTrios: 'Tre trissar',
        twoTriosAndOneStraight: 'Två trissar och en stege',
        oneTrioAndTwoStraight: 'En triss och två stegar',
        threeStraights: 'Tre stegar',
        theGoalIs:
          'Målet i UBB är att samla så lite poäng som möjligt i varje omgång. Vinnaren är den spelare som har lägst poäng när alla omgångarna är färdigspelade. Se reglerna för poängräkningen',
        below: 'nedan',
        discardPile: 'kasthögen',
        drawPile: 'draghögen',
        setsArePlayedThus: 'Omgångarna spelas enligt följande',
        setsArePlayedThus1_1:
          'Dealern delar kort till spelarna och lägger sedan resterande kort (kallad ',
        setsArePlayedThus1_2:
          ') mitt på bordet. Sedan vänder dealern det översta kortet och lägger det bredvid, i en ny hög (kallad ',
        setsArePlayedThus1_3: ').',
        setsArePlayedThus2:
          'Spelaren som sitter till vänster om dealern börjar sin tur med att ta upp ett kort, det översta från draghögen eller från kasthögen.',
        setsArePlayedThus3:
          'Spelaren får nu, om hen kan och vill, lägga ner den erfordrade kombination av trissar och stegar på bordet framför sig (man ',
        setsArePlayedThus3_1: 'lägger ner ',
        setsArePlayedThus3_2: 'korten).',
        setsArePlayedThus4:
          'Sist slänger spelaren ett kort i slänghögen. Därefter är det nästa spelarens tur.',
        setsArePlayedThus5:
          'Omgången fortsätter till en spelare har gjort sig av med alla sina kort.',
        setsArePlayedThus6:
          'Vid omgångens slut räknar alla spelare sina poäng och registrerar dem i tabellen. Därefter börjar nästa omgång, och den nya dealer är den som sitter til vänster om den gamla dealern.',
        buying1:
          'När en spelare kastat ett kort i slänghögen, innan nästa spelaren har tagit upp ett kort, kan alla spelare få en chans att köpa det nyligen slängda kortet. Kortet får bara köpas om inte spelaren som nu står på tur vill ha kortet. Spelaren till vänster om denna får första tjing, sedan nästa spelare till vänster osv. När man köper kortet från slänghögen, får man ta ett extra kort från draghögen som extra betalning.',
        buying2_1: 'Även den spelare som just slängt kortet får köpa det. (Det kallas att man ',
        buying2_2: 'köper tillbaka',
        buying2_3:
          ' kortet). Det kan man göra om man inte har något bra slängkort. Naturligtvis är man då sist i prioordningen, och om en annan spelare vill ha kortet får de köpa det före.',
        buying3:
          'Spelare som har lagt ner korten (dvs spelade den erfordrade kombinationen av trissar och stegar) får inte längre köpa några kort.',
        jokers1: 'Jokrarna kan användas som ersättare för vilket kort som helst i en serie, t ex',
        jokers2:
          'En serie kan innehålla högst en joker. När en spelare lagt ner sina serier, kan hen byta ut en joker som en annan spelare använt i en stege om hen har motsvarande kort i handen. Den frigjorda jokern kan då användas i samma eller en annan serie. Dock måste "en joker per serie"-regeln följas även då.',
        counting1:
          'Vid omgångens slut, dvs när en spelare inte har några kort kvar i handen, räknar alla andra spelare sina poäng. Detta görs genom att varje spelare konverterar de kort de har kvar i handen till poäng mha av tabellen nedan och summerar ihop dem.',
        cards: 'Kort',
        pointsHeader: 'Poäng',
        tenJackQueenAndKing: 'Tio, knekt, dam och kung',
        ace: 'Ess',
        joker: 'Joker',
        jokerSubstitute:
          'Jokersubstitut - om man har kvar ett kort i handen, som en annan spelare ersatt med en joker i en av sina stegar, så är detta kort värt lika mycket som en joker, dvs 50 poäng.',

        statistics: 'Statistik',
        players: 'Spelare',
        gameHistory: 'Spelhistorik',
        winningLeague: 'Vinstligan',
        times: 'ggr',
        points: 'p',
        lowestWinningPoints: 'Lägsta vinstpoäng',
        pointLeague: 'Poängligan',
        highestHand: 'Högsta handen',
        mostPlayed: 'Flest spelat',
        highestDiff: 'Högsta diffen',
        numberOfGames: 'Antal spel',
        weekday: 'Veckodag',
        choosePlayer: 'Välj en spelare',
        maxPoints: 'Maxpoäng',
        averagePoints: 'Genomsnittliga poäng',
        minPoints: 'Minpoäng',
        placements: 'Placeringar',
        setMasters: 'Omgångsmästare',

        resetCertainty: 'Är du säker på att du vill starta om?',
        reset: 'Starta om',
        resetLevel0: 'Nej',
        resetLevel1: 'Sådär',
        resetLevel2: 'Ganska',
        resetLevel3: 'Hyfsat',
        resetLevel4: 'Väldigt'
      }
    }
  }
})

// {{ $t('message.xxx') }}
