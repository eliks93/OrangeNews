# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Article.create(headline: 'Yeeters', snippet: 'random stuff that doesnt matttttter', publisher: "yoloNews", image: 'fakeLink', link: 'yeeeeeet')
Article.create(headline: 'two', snippet: 'random stuff that doesnt matttttter', publisher: "yoloNews", image: 'fakeLink', link: 'yeeeeeet')
Article.create(headline: 'three', snippet: 'random stuff that doesnt matttttter', publisher: "yoloNews", image: 'fakeLink', link: 'yeeeeeet')
Article.create(headline: 'Four', snippet: 'Palestinians have dismissed US President Donald Trump\'s new Middle East peace plan as a "conspiracy". The plan envisages a Palestinian state and the recognition of Israeli sovereignty over West Bank settlements. Mr Trump said Jerusalem would remain Israel\'s "undivided" capital, but the Palestinian capital would "include areas of East Jerusalem". Reacting to Tuesday\'s announcement, Palestinian President Mahmoud Abbas said Jerusalem was "not for sale". "All our rights are not for sale and are not for bargain," he added.', publisher: "BBC", image: 'https://ichef.bbci.co.uk/images/ic/720x405/p081qbr4.jpg', link: 'https://www.bbc.com/news/world-middle-east-51292865')
p = Article.create(created_at: 5.days.ago, headline: 'Four', snippet: 'Palestinians have dismissed US President Donald Trump\'s new Middle East peace plan as a "conspiracy". The plan envisages a Palestinian state and the recognition of Israeli sovereignty over West Bank settlements. Mr Trump said Jerusalem would remain Israel\'s "undivided" capital, but the Palestinian capital would "include areas of East Jerusalem". Reacting to Tuesday\'s announcement, Palestinian President Mahmoud Abbas said Jerusalem was "not for sale". "All our rights are not for sale and are not for bargain," he added.', publisher: "BBC", image: 'https://ichef.bbci.co.uk/images/ic/720x405/p081qbr4.jpg', link: 'https://www.bbc.com/news/world-middle-east-51292865')
p.update_attribute :created_at, 2.days.ago