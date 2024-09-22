import { createI18n } from 'vue-i18n'

export const inter = createI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        welcome: 'Welcome to UBB!',
        loginWithGoogle: 'Log in with Google',
        loginWithTwitter: 'Log in with Twitter',
        logout: 'Log out',
        restart: 'Restart',
        numberOfPlayers: 'Players',
        ubb: 'UBB',
        longUbb: 'Long UBB',
        longerUbb: 'Longer UBB',
        ok: 'Ok',
        close: 'Close',
        saved: 'Game saved. Statistics available here',
        name: 'Name',
        sum: 'Sum',
        save: 'Save results',

        statistics: 'Statistics',
        players: 'Players',
        gameHistory: 'Game History',
        winningLeague: 'Winning League',
        times: 'times',
        percentage: '%',
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
        weighedWinner: 'Weighed Winners'
      }
    },
    sv: {
      message: {
        welcome: 'Välkommen till UBB!',
        loginWithGoogle: 'Logga in med Google',
        loginWithTwitter: 'Logga in med Twitter',
        logout: 'Logga ut',
        restart: 'Starta om',
        numberOfPlayers: 'Spelare',
        ubb: 'UBB',
        longUbb: 'Lång UBB',
        longerUbb: 'Längre UBB',
        ok: 'Ok',
        close: 'Stäng',
        saved: 'Spelet är sparat. Statistiken finns här',
        name: 'Namn',
        sum: 'Summa',
        save: 'Spara resultat',

        statistics: 'Statistik',
        players: 'Spelare',
        gameHistory: 'Spelhistorik',
        winningLeague: 'Vinstligan',
        times: 'ggr',
        percentage: '%',
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
        weighedWinner: 'Viktade vinnare'
      }
    }
  }
})

// {{ $t('message.xxx') }}
