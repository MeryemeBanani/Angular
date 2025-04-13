import { Component, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  curriculumForm: FormGroup;

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.curriculumForm = this.fb.group({
      nome: [''],
      cognome: [''],
      email: [''],
      telefono: [''],
      indirizzo: [''],
      dataNascita: [''],
      esperienze: [''],
      formazione: [''],
      competenze: ['']
    });
  }

  generaPDF() {
    const elemento = this.pdfContent.nativeElement;

    html2canvas(elemento).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('curriculum_europass.pdf');
    });
  }
}

