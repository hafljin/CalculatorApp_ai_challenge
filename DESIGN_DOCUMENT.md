# 計算機アプリ 設計書・仕様書

## 1. プロジェクト概要

### 1.1 アプリケーション名
計算機アプリ（Calculator App）

### 1.2 技術スタック
- **フレームワーク**: React Native / Expo
- **言語**: TypeScript
- **ナビゲーション**: Expo Router
- **状態管理**: React Hooks
- **UIライブラリ**: React Native Components + Expo Linear Gradient

### 1.3 主要機能
1. 基本的な計算機機能
2. 単位変換機能（長さ、重さ、温度）
3. 計算履歴機能
4. iOS風のUIデザイン

## 2. アーキテクチャ設計

### 2.1 ディレクトリ構造
```
app/
├── (tabs)/
│   ├── _layout.tsx          # タブナビゲーション設定
│   ├── index.tsx            # 計算機メイン画面
│   ├── converter.tsx        # 単位変換画面
│   └── history.tsx          # 履歴画面
├── _layout.tsx              # ルートレイアウト
└── +not-found.tsx           # 404画面

components/
├── Calculator/
│   ├── Button.tsx           # 計算機ボタンコンポーネント
│   ├── Display.tsx          # 計算機ディスプレイコンポーネント
│   ├── Keypad.tsx           # 計算機キーパッドコンポーネント
│   └── HistoryItem.tsx      # 履歴アイテムコンポーネント
└── Converter/
    ├── CategorySelector.tsx # カテゴリ選択コンポーネント
    └── UnitSelector.tsx     # 単位選択コンポーネント

hooks/
├── useCalculator.ts         # 計算機ロジックフック
├── useConverter.ts          # 単位変換ロジックフック
└── useFrameworkReady.ts     # フレームワーク準備フック

types/
├── calculator.ts            # 計算機関連型定義
└── converter.ts             # 単位変換関連型定義

utils/
├── calculator.ts            # 計算機ユーティリティ
└── converter.ts             # 単位変換ユーティリティ
```

## 3. 画面設計

### 3.1 タブナビゲーション（app/(tabs)/_layout.tsx）

#### 設定項目
- **背景色**: `#111827`（ダークグレー）
- **高さ**: 60px
- **パディング**: 上下8px
- **アクティブ色**: `#3B82F6`（ブルー）
- **非アクティブ色**: `#6B7280`（グレー）

#### タブ構成
1. **計算機** - Calculatorアイコン
2. **単位変換** - Rulerアイコン  
3. **履歴** - Historyアイコン

### 3.2 計算機画面（app/(tabs)/index.tsx）

#### レイアウト構成
```
SafeAreaView
└── LinearGradient (背景グラデーション)
    └── View (content)
        ├── Display (計算結果表示)
        └── Keypad (ボタン配置)
```

#### 背景グラデーション
- 色: `['#111827', '#1F2937', '#374151']`
- SafeAreaView背景色: `#374151`

#### ディスプレイ（components/Calculator/Display.tsx）
- **背景**: 半透明白 `rgba(255, 255, 255, 0.05)`
- **フォント**: モノスペース、36px、白色
- **配置**: 右寄せ
- **最小高さ**: 80px
- **パディング**: 20px

#### キーパッド（components/Calculator/Keypad.tsx）
- **レイアウト**: 4列×5行のグリッド
- **ボタン配置**: `justifyContent: 'space-evenly'`
- **間隔**: `marginHorizontal: 2px`
- **下部パディング**: 20px

#### ボタン（components/Calculator/Button.tsx）
- **形状**: 円形（`borderRadius: 35`）
- **サイズ**: `aspectRatio: 1`
- **アニメーション**: スプリングアニメーション（タップ時）
- **影**: `elevation: 3`, `shadowRadius: 4`

#### ボタンタイプ別色設定
- **数字ボタン**: `['#333333', '#2C2C2E']`（ダークグレー）
- **演算子ボタン**: `['#FF9500', '#FF8000']`（オレンジ）
- **機能ボタン**: `['#A5A5A5', '#8E8E93']`（グレー）
- **イコールボタン**: `['#FF9500', '#FF8000']`（オレンジ）

### 3.3 単位変換画面（app/(tabs)/converter.tsx）

#### 機能
- 3つのカテゴリ（長さ、重さ、温度）
- 各カテゴリ内で5つ以上の単位変換
- リアルタイム変換
- 入力値検証

#### カテゴリ
1. **長さ**: mm, cm, m, km, inch, ft, yd, mile
2. **重さ**: mg, g, kg, t, oz, lb, st
3. **温度**: °C, °F, K, °R

### 3.4 履歴画面（app/(tabs)/history.tsx）

#### 機能
- 計算履歴の表示
- 履歴アイテムの削除
- 履歴のクリア

## 4. 状態管理設計

### 4.1 計算機状態（hooks/useCalculator.ts）

#### 状態構造
```typescript
interface CalculatorState {
  display: string;           // 表示値
  previousValue: number;     // 前の値
  operation: string | null;  // 演算子
  waitingForOperand: boolean; // オペランド待ちフラグ
  error: string | null;      // エラーメッセージ
}
```

#### 主要アクション
- `inputNumber`: 数字入力
- `inputOperation`: 演算子入力
- `calculate`: 計算実行
- `clear`: クリア
- `backspace`: バックスペース
- `toggleSign`: 符号反転
- `percentage`: パーセント計算

### 4.2 単位変換状態（hooks/useConverter.ts）

#### 状態構造
```typescript
interface ConverterState {
  selectedCategory: string;  // 選択カテゴリ
  fromUnit: string;         // 変換元単位
  toUnit: string;           // 変換先単位
  inputValue: string;       // 入力値
  result: string;           // 変換結果
  error: string | null;     // エラーメッセージ
}
```

#### 主要アクション
- `setCategory`: カテゴリ設定
- `setFromUnit`: 変換元単位設定
- `setToUnit`: 変換先単位設定
- `setInputValue`: 入力値設定
- `convert`: 変換実行
- `clear`: クリア

## 5. データフロー

### 5.1 計算機データフロー
```
ユーザー入力 → useCalculator → 状態更新 → Display表示
```

### 5.2 単位変換データフロー
```
ユーザー選択 → useConverter → 変換実行 → 結果表示
```

### 5.3 履歴データフロー
```
計算実行 → 履歴保存 → AsyncStorage → 履歴画面表示
```

## 6. エラーハンドリング

### 6.1 計算機エラー
- ゼロ除算エラー
- オーバーフローエラー
- 無効な入力エラー

### 6.2 単位変換エラー
- 無効な入力値
- 変換不可能な単位組み合わせ

## 7. パフォーマンス考慮事項

### 7.1 最適化
- React.memoによる不要な再レンダリング防止
- useCallbackによる関数メモ化
- 適切なキー設定によるリスト最適化

### 7.2 メモリ管理
- AsyncStorageによる履歴データ永続化
- 適切なクリーンアップ処理

## 8. セキュリティ考慮事項

### 8.1 入力検証
- 数値入力の検証
- 演算子の妥当性チェック
- 単位変換の範囲チェック

### 8.2 データ保護
- ローカルストレージのみ使用
- 外部API不使用

## 9. テスト戦略

### 9.1 単体テスト
- 計算ロジックのテスト
- 単位変換ロジックのテスト
- コンポーネントのテスト

### 9.2 統合テスト
- 画面遷移のテスト
- 状態管理のテスト
- ユーザー操作フローのテスト

## 10. 今後の拡張予定

### 10.1 機能拡張
- 科学計算機能
- 通貨変換機能
- カスタムテーマ機能

### 10.2 技術的改善
- パフォーマンス最適化
- アクセシビリティ向上
- 国際化対応 