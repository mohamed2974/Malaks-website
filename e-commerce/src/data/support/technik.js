const technikOption = [
    {value: 'Zahlung abschließen', label: 'Ich kann die Zahlung nicht abschließen'},
    {value: 'Checkout-System', label: 'Das Checkout-System zeigt einen Fehler an'},
    {value: 'Warenkorb', label: 'Meine Bestellung wird nicht im Warenkorb angezeigt'},
    {value: 'Produkt / Warenkorb', label: 'Ich kann mein Produkt nicht in den Warenkorb legen'},
    {value: 'Langsam / abstürzen', label: 'Die Website lädt langsam oder stürzt ab'},
    {value: 'Navigieren', label: 'Ich habe Probleme beim Navigieren auf der Website'},
    {value: 'Rabattcode', label: 'Der Rabattcode wird nicht korrekt angewendet'},
    {value: 'Produktdetails anzeige', label: 'Die Produktbilder oder -beschreibungen werden nicht richtig angezeigt'},
    {value: 'Preis stimmt nicht', label: 'Der Preis stimmt nicht mit dem auf der Produktseite überein'},
    {value: 'Produkte Auswahl', label: 'Ich kann keine Produkte in verschiedenen Varianten (Modell, Menge) auswählen'},
]

const geraetOption = [
    {value: 'mobile / android', label: 'Smartphone - Android'},
    {value: 'tab / iOS', label: 'Smartphone - iOS'},
    {value: 'mobile / android', label: 'Tablet  - Android'},
    {value: 'tab / iOS', label: 'Tablet  - iOS'},
    {value: 'Mac', label: 'Mac'},
    {value: 'Windows', label: 'Windows'},
    {value: 'Linux', label: 'Linux'},
    {value: 'andere geräte', label: 'Andere'},
]

const browserOption = [
    {value: 'Chrome', label: 'Chrome'},
    {value: 'Safari', label: 'Safari'},
    {value: 'andere browser', label: 'Andere'},
]

export {technikOption, browserOption, geraetOption}