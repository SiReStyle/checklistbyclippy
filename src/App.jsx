import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import confetti from 'canvas-confetti';

const checklistItems = [
  {
    title: "Ausweis und Reisepass",
    description: "Beantrage neue Ausweisdokumente beim Bürgerbüro. Bring deinen alten Ausweis, ein biometrisches Passfoto und den Nachweis der Namensänderung mit."
  },
  {
    title: "Führerschein und Fahrzeugpapiere",
    description: "Führerschein bei der Führerscheinstelle umschreiben lassen. Fahrzeugbrief und Fahrzeugschein bei der Zulassungsstelle anpassen lassen."
  },
  {
    title: "Versicherungen",
    description: "Melde deine Namensänderung bei allen Versicherungen: Kfz, Kranken-, Haftpflicht-, Lebensversicherung, Rentenkasse etc."
  },
  {
    title: "Banken und Finanzen",
    description: "Informiere deine Bank(en), Kreditkartenanbieter, PayPal, Amazon & Co. Auch Daueraufträge prüfen!"
  },
  {
    title: "Verträge und Mitgliedschaften",
    description: "Aktualisiere Verträge für Handy, Strom, Internet, Streamingdienste und Mitgliedschaften."
  },
  {
    title: "Post und Behörden",
    description: "Finanzamt, GEZ, Agentur für Arbeit etc. informieren. Meldeänderung passiert meist automatisch bei Ausweisänderung."
  },
  {
    title: "Berufliches und Soziales",
    description: "Sag deinem Arbeitgeber Bescheid. Aktualisiere Rentenkonto, Berufskammern, Schulen oder Kitas."
  },
  {
    title: "Digitales Leben",
    description: "E-Mail-Adressen, Social-Media-Profile, Kundenkonten (Zalando, eBay, Booking...) anpassen."
  },
  {
    title: "Für deinen Hund Pepper",
    description: "Namensänderung bei Stadt (Hundesteuer), Tierarzt und ggf. Hundeschule oder Versicherung mitteilen."
  },
  {
    title: "Tipp: Dokumentenmappe anlegen",
    description: "Kopien der Heiratsurkunde, Fotos, alte Ausweise und Liste aller betroffenen Stellen bereitlegen."
  },
];

export default function NamensCheckliste() {
  const [checked, setChecked] = useState<boolean[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("checklist_state");
      return stored ? JSON.parse(stored) : Array(checklistItems.length).fill(false);
    }
    return Array(checklistItems.length).fill(false);
  });

  useEffect(() => {
    localStorage.setItem("checklist_state", JSON.stringify(checked));
  }, [checked]);

  const toggleCheck = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
    if (updated[index]) {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const progress = (checked.filter(Boolean).length / checklistItems.length) * 100;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">📝 Namensänderung-Checkliste</h1>
      <Progress value={progress} className="h-4" />
      <p className="text-sm text-center">{Math.round(progress)}% erledigt</p>
      {checklistItems.map((item, index) => (
        <Card key={index} className="bg-white shadow rounded-2xl">
          <CardContent className="p-4 flex gap-4">
            <Checkbox checked={checked[index]} onCheckedChange={() => toggleCheck(index)} />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
