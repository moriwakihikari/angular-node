import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // CommonModuleをインポート
import { FormsModule } from '@angular/forms'; // ngModelを使用するために必要
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  lessons: { id: number; name: string }[] = []; // レッスンデータを格納する変数
  folders: { id: number; name: string }[] = [];
  selectedLessonId: number | null = null; // 選択された教科IDを格納
  folderName: string = ''; // フォルダ名を格納する変数

  constructor(private http: HttpClient) {}

  // 初期処理 実行したい関数をセットする
  ngOnInit(): void {
    this.getLessons();
    this.onLessonChange();
  }

  // 授業取得関数
  getLessons(): void {
    this.http
      .get<{ lessons: { id: number; name: string }[] }>(
        'http://localhost:3000/lesson'
      )
      .subscribe(
        (response) => {
          this.lessons = response.lessons;
        },
        (error) => {
          console.error('Error fetching lessons:', error);
        }
      );
  }

  // 授業変更時の処理
  onLessonChange(): void {
    if (this.selectedLessonId) {
      this.http
        .get<{ id: number; name: string }[]>(
          `http://localhost:3000/folders?lessonId=${this.selectedLessonId}`
        )
        .subscribe(
          (response) => {
            this.folders = response; // responseは配列のため、そのまま使用する
          },
          (error) => {
            console.error('Error fetching folders:', error);
          }
        );
    }
  }

  // フォルダ作成関数
  createFolder(): void {
    if (this.selectedLessonId && this.folderName) {
      // 選択した教科とフォルダ名でサーバーにリクエストを投げる
      this.http
        .post('http://localhost:3000/create-folder', {
          lessonId: this.selectedLessonId,
          folderName: this.folderName,
        })
        .subscribe(
          (response) => {
            console.log('Folder created:', response);
            alert('フォルダが作成されました');

            // フォルダ作成後、最新のフォルダ一覧を取得
            this.onLessonChange();
          },
          (error) => {
            console.error('Error creating folder:', error);
          }
        );
    } else {
      alert('教科とフォルダ名を入力してください');
    }
  }

  // フォルダ削除確認メソッド
  confirmDelete(folderId: number): void {
    const confirmDelete = confirm('このフォルダを削除してもよろしいですか？');
    if (confirmDelete) {
      this.deleteFolder(folderId); // フォルダ削除メソッドを呼び出す
    }
  }

  // フォルダ削除メソッド
  deleteFolder(folderId: number): void {
    this.http
      .delete(`http://localhost:3000/delete-folder/${folderId}`)
      .subscribe(
        (response) => {
          console.log('Folder deleted:', response);
          alert('フォルダが削除されました');

          // フォルダ一覧を再取得して再レンダリング
          this.onLessonChange();
        },
        (error) => {
          console.error('Error deleting folder:', error);
        }
      );
  }
}
