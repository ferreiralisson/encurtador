import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UrlShortenerService } from '../services/url-shortener.service';

@Component({
  selector: 'app-url-shortener',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './url-shortener.component.html',
  styleUrl: './url-shortener.component.css'
})
export class UrlShortenerComponent implements OnInit {
  urlInput: string = '';
  shortUrl: string | null = null;
  errorMessage: string | null = null;
  initialLoading = true;
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private shortenerService: UrlShortenerService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.initialLoading = false;
    }, 2000);
  }

  shortenUrl(){
    this.shortUrl = null;
    this.errorMessage = null;

    const url = this.urlInput.trim();
    if(!url) {
      this.snackBar.open('Por favor, insira uma URL válida.', 'Fechar', {duration: 3000});
      return;
    }

    this.loading = true;

    this.shortenerService.shortenUrl(url)
    .subscribe({
      next: (response) => {
        this.shortUrl = response;
        this.snackBar.open('URL encurtada com sucesso!', 'OK', { duration: 3000});
      },
      error: () => {
        this.snackBar.open('Erro ao encurtar a URL', 'Fechar', { duration: 3000});
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

}
