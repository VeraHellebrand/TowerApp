import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent {
  form: FormGroup;
  selectedRecord: any[] = []; // Pole pro uložení záznamů
  dataSelect = output<any>();
  isLoaded: boolean = false;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      file: ['', Validators.required], // Formulář s jedním polem pro soubor
    });
  }

  uploadCSV(fileInput: HTMLInputElement) {
    // Načtení souborů z input elementu
    const files: FileList | null = fileInput.files;

    if (files && files.length > 0) {
      // Ošetření, aby byl vybrán pouze jeden soubor
      const selectedFile: File = files[0];

      const reader = new FileReader();

      // Nastavení funkce, která se spustí po načtení souboru
      reader.onload = (event) => {
        const fileContent: string | null = event.target?.result as string;

        this.parseCSV(fileContent);
      };

      // Nastavení funkce pro ošetření chyby při čtení souboru
      reader.onerror = (error) => {
        console.error('Chyba při čtení souboru:', error);
      };

      // Spuštění čtení souboru jako text
      reader.readAsText(selectedFile);
    } else {
      console.log('Nebyl vybrán žádný soubor');
    }
  }

  // Rozdělení textu CSV souboru na potřebná data
  parseCSV(text: string) {
    let header = true;
    text.split('\n').forEach((line) => {
      // Ošetření hlavičkového řádku
      if (header) {
        header = false;
        return;
      }
      const temp = line.split(',').map(value=>value.replace(/^"(.*)"$/, '$1'));
      const record = {
        date: temp[16], // Datum
        lat: temp[10], // Zeměpisná šířka
        lon: temp[11], // Zeměpisná délka
        cell_id: temp[4], // ID věže
        cell_rnc: temp[5], // RNC věže
        signal: temp[8], // Síla signálu
        type: temp[17], // Typ připojení
      };

      // Neúplná data se neuloží
      if (Object.values(record).some((val) => val !== '')) {
        this.selectedRecord.push(record);
      }
    });
    //kontrola
    console.log('Všechny zpracované záznamy:', this.selectedRecord);
    this.isLoaded = true
    this.dataSelect.emit(this.selectedRecord)
  }
}
