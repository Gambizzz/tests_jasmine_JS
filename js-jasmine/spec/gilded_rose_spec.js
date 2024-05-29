//j'importe les classes Shop et Item du fichier gilded_rose.js
const { Shop, Item } = require('../src/gilded_rose.js');

//je définis la suite de tests
describe("Gilded Rose", function() {

  //je réalise un test complet: vérification de l'évolution des items sur plusieurs jours
  it("full test", () => {
    //je créé une liste d'items (différents types/valeurs de base)
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    //je détermine le nombre de jours à simuler (2)
    const days = Number(process.argv[2]) || 2;
    //je créé une instance de Shop avec les items
    const gildedRose = new Shop(items);

    //je boucle pour simuler chaque jour
    for (let day = 0; day < days; day++) {
      //affichage jour actuel
      console.log(`\n-------- day ${day} --------`);
      //affichage titres des colonnes
      console.log("name, sellIn, quality");
      //affichage détails de chaque item
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      //je mets à jour la qualité des items après chaque jour
      gildedRose.updateQuality();
    }
  });

  //test 1 : vérifier que la qualité diminue de 1
  it("should decrease quality by 1", function() {
    const gildedRose = new Shop([new Item("foo", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(9);
  });

  //test 2 : vérifier que la qualité d'Aged Brie augmente de 1
  it("should increase quality by 1 for Aged Brie", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(11);
  });

  //test 3 : vérifier que la qualité ne descende pas en dessous de 0
  it("should not decrease quality below 0", function() {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  //test 4 : vérifier que la qualité ne dépasse pas 50
  it("should not increase quality above 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  //test 5 : vérifier que la qualité de Sulfuras ne change pas (= 80)
  it("should not change quality of Sulfuras", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
  });

  //test 6 : vérifier que la qualité des Backstage passes + 3 quand il reste 5 jours ou -
  it("should increase quality by 3 for Backstage passes with 5 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(13);
  });

  //test 7 : vérifier que la qualité des Backstage passes = 0 après le concert
  it("should drop quality to 0 after concert for Backstage passes", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  //test 8 : vérifier que la qualité des items Conjured diminue de 2
  it("should decrease quality by 2 for Conjured items", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(4);
  });

  //test 9 : vérifier que la qualité des items Conjured diminue de 4 après la date de péremption
  it("should decrease quality by 4 for Conjured items after sellIn", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 6)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(2);
  });
});

