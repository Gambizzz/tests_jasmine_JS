class Item {
  //j'initialise un item avec un nom, un nombre de jours de vente restants (sellIn) et une qualité
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  //initialisation de la boutique avec une liste d'items
  constructor(items = []) {
    this.items = items;
  }

  //mise à jour de la qualité de tous les items
  updateQuality() {
    for (let item of this.items) {
      this.updateItem(item); //mise à jour individuelle
    }
    return this.items; //on retourne la liste à jour des items
  }

  //mise à jour d'un item en particulier
  updateItem(item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") return; //cet item ne doit jamais changer

    this.updateSellIn(item);
    this.updateQualityForItem(item);

    //mise à jour si la date de péremption est passée
    if (item.sellIn < 0) {
      this.updateQualityAfterExpiration(item);
    }
  }

  //mise à jour du nombre de sellIn d'un item
  updateSellIn(item) {
    item.sellIn -= 1;
  }

  //mise à jour de la qualité d'un item selon son type
  updateQualityForItem(item) {
    if (item.name.includes("Conjured")) {
      this.decreaseQuality(item, 2); //- 2 points de qualité
    } else if (item.name === "Aged Brie") {
      this.increaseQuality(item, 1); //+ 1 point de qualité
    } else if (item.name.includes("Backstage passes")) {
      this.updateBackstagePassesQuality(item); //règles spéciales pour Backstage passes
    } else {
      this.decreaseQuality(item, 1); //sinon, tous les autres : - 1 point de qualité
    }
  }

  //mise à jour de la qualité d'un item après date de péremption
  updateQualityAfterExpiration(item) {
    if (item.name.includes("Conjured")) {
      this.decreaseQuality(item, 2); //- 2 points de qualité supplémentaires
    } else if (item.name === "Aged Brie") {
      this.increaseQuality(item, 1); //+ 1 point de qualité supplémentaire
    } else if (item.name.includes("Backstage passes")) {
      item.quality = 0; //qualité = 0 pour Backstage passes
    } else {
      this.decreaseQuality(item, 1); //autres items : - 1 point de qualité supplémentaire
    }
  }

  //mise à jour de la qualité des Backstage passes
  updateBackstagePassesQuality(item) {
    if (item.sellIn <= 0) {
      item.quality = 0; //qualité = 0 après le concert
    } else if (item.sellIn <= 5) {
      this.increaseQuality(item, 3); //+ 3 points de qualité si le concert est dans 5 jours ou -
    } else if (item.sellIn <= 10) {
      this.increaseQuality(item, 2); //+ 2 points de qualité si le concert est dans 10 jours ou -
    } else {
      this.increaseQuality(item, 1); //+ 1 point de qualité si le concert est dans + de 10 jours
    }
  }

  //augmenter la qualité d'un item sans dépasser 50
  increaseQuality(item, amount) {
    item.quality = Math.min(50, item.quality + amount);
  }

  //diminuer la qualité d'un item sans descendre sous 0
  decreaseQuality(item, amount) {
    item.quality = Math.max(0, item.quality - amount);
  }
}

module.exports = {
  Item,
  Shop
};

