import React, { useState } from "react";
import "./App.css";

function App() {
  // States to store user inputs
  const [salaireAnnuelBrut, setSalaireAnnuelBrut] = useState(100000);
  const [impotsPourcentage, setImpotsPourcentage] = useState(7); // Impôts par défaut à 7%
  const [augmentationPourcentage, setAugmentationPourcentage] = useState(5); // Augmentation par défaut à 5%

  // Calculs de base
  const salaireMensuelBrut = salaireAnnuelBrut / 12;
  const salaireMensuelNet = salaireMensuelBrut * 0.775; // Hypothèse 77.5% du brut
  const salaireNetApresImpots = salaireMensuelNet - (impotsPourcentage*salaireMensuelNet / 100);

  const primeBrut = 2838; // Hypothèse: prime de 10% du salaire brut annuel
  const primeNet = primeBrut * 0.775;
  const primeApresImpots = primeNet * 0.89;

  const fraisJour = 18.1; // Hypothèse: frais journaliers fixes
  const fraisAnnuelNet = fraisJour * 217; // 217 jours travaillés par an
  const fraisAnnuelBrut = fraisAnnuelNet * 1.333; // Hypothèse de conversion net -> brut

  const packageAnnuelBrut = salaireAnnuelBrut + fraisAnnuelBrut + primeBrut+(34,32*12);
  const packageAnnuelNet = fraisAnnuelNet + primeApresImpots + (salaireNetApresImpots * 12);

  const packageMensuelBrut = packageAnnuelBrut / 12;
  const packageMensuelNet = packageAnnuelNet / 12;
  const packageMensuelBrutSansPrime = (packageMensuelBrut -(primeApresImpots / 12));
  const packageMensuelNetSansPrime = (packageMensuelNet -(primeApresImpots / 12));


  // Calculs après augmentation
  const montantAugmentation = salaireAnnuelBrut * (augmentationPourcentage / 100);
  const nouveauSalaireBrut = salaireAnnuelBrut + montantAugmentation;
  const nouveauMensuelNet = (nouveauSalaireBrut / 12) * 0.775; // Nouvelle mensualité nette après augmentation
  const nvPackageAnnuelNet = nouveauMensuelNet * 12 + fraisAnnuelNet + primeApresImpots;
  const augmentationPackageNet = nvPackageAnnuelNet - packageAnnuelNet;

  return (
    <div className="App">
      <h1>Calculateur Salaire -_-'</h1>

      <div className="container">
        {/* Section Salaire Fixe avec TextField */}
        <div className="section">
          <h3>Salaire Fixe</h3>
          <label htmlFor="salaireAnnuelBrut">Salaire Annuel Brut:</label>
          <input
            type="number"
            value={salaireAnnuelBrut}
            onChange={(e) => setSalaireAnnuelBrut(Number(e.target.value))}
            id="salaireAnnuelBrut"
            placeholder="Entrez le salaire annuel brut"
          />
          <p>Mensuel Brut: {salaireMensuelBrut.toFixed(2)}</p>
          <p>Mensuel Net: {salaireMensuelNet.toFixed(2)}</p>
          <p>Net après Impôts: {salaireNetApresImpots.toFixed(2)}</p>
        </div>

        {/* Section pourcentage impôt */}
        <div className="section">
          <h3>Impôts</h3>
          <label htmlFor="impotsPourcentage">Pourcentage d'Impôts:</label>
          <input
            type="number"
            value={impotsPourcentage}
            onChange={(e) => setImpotsPourcentage(e.target.value)}
            id="impotsPourcentage"
            placeholder="Entrez le pourcentage d'impôt"
          />
          <p>Impôt appliqué: {impotsPourcentage}%</p>
        </div>

        {/* Section Prime Participation */}
        <div className="section">
          <h3>Prime Participation</h3>
          <p>Brut: {primeBrut.toFixed(2)}</p>
          <p>Net: {primeNet.toFixed(2)}</p>
          <p>Après Impôts: {primeApresImpots.toFixed(2)}</p>
        </div>

        {/* Section Frais */}
        <div className="section">
          <h3>Frais</h3>
          <p>Frais/jr: {fraisJour}</p>
          <p>Année Net: {fraisAnnuelNet.toFixed(2)}</p>
          <p>Année Brut: {fraisAnnuelBrut.toFixed(2)}</p>
        </div>

        {/* Section Package Annuel */}
        <div className="section">
          <h3>Package Annuel</h3>
          <p>Annuel Brut: {packageAnnuelBrut.toFixed(2)}</p>
          <p>Annuel Net: {packageAnnuelNet.toFixed(2)}</p>
        </div>

        {/* Section Package Mensuel Avec Prime */}
        <div className="section">
          <h3>Package Mensuel (Fixe + Frais + Prime + Mutuelle)</h3>
          <p>Mensuel Brut: {packageMensuelBrut.toFixed(2)}</p>
          <p>Mensuel Net: {packageMensuelNet.toFixed(2)}</p>
        </div>

        {/* Section Package Mensuel Sans Prime */}
        <div className="section">
          <h3>Package Mensuel (Sans Prime)</h3>
          <p>Mensuel Brut: {packageMensuelBrutSansPrime.toFixed(2)}</p>
          <p>Mensuel Net: {packageMensuelNetSansPrime.toFixed(2)}</p>
        </div>

        {/* Section Augmentation */}
        <div className="section">
          <h3>Augmentation</h3>
          <label htmlFor="augmentationPourcentage">Augmentation %</label>
          <input
            type="number"
            value={augmentationPourcentage}
            onChange={(e) => setAugmentationPourcentage(Number(e.target.value))}
            id="augmentationPourcentage"
            placeholder="Pourcentage d'augmentation"
          />
          <p>Salaire Brut actuel: {salaireAnnuelBrut}</p>
          <p>Nouveau Salaire Brut: {nouveauSalaireBrut.toFixed(2)}</p>
          <p>Nouveau Mensuel Net: {nouveauMensuelNet.toFixed(2)}</p>
          <p>Montant Augmenté: {montantAugmentation.toFixed(2)}</p>
          <p>Nv Package Annuel Net: {nvPackageAnnuelNet.toFixed(2)}</p>
          <p>Augmentation Package: {augmentationPackageNet.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
