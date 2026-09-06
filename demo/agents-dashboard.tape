# cmd+p で開く自作エージェントダッシュボードの録画。
#   vhs demo/agents-dashboard.tape
# herdr が起動している必要がある。herdr agent list の実データがそのまま映るので、
# 録画前に一覧とプレビューに出るタイトル・パスを確認すること。
#
# 一覧の 1 行目は録画している当のセッションなので、カーソルを当てるとこの会話が
# プレビューに映る。Hide のうちに 3 つ下 (blocked) まで送ってから Show する。

Output public/agents-dashboard.gif

# herdr は dracula だが、スライドのテーマ (Nord) に寄せる。
Set Theme "nord"
Set Shell "zsh"
Set FontFamily "HackGen Console NF"
Set FontSize 18
# 実際は全画面 popup なので、一覧が潰れない幅を取る。
Set Width 1700
Set Height 590
Set Padding 12
Set Framerate 24

# 実際は cmd+p の一発で開くので、起動をタイプする様子は映さない。
Hide
Type "clear"
Enter
Type "sh ~/.config/herdr/scripts/agents-dashboard.sh"
Enter
Sleep 3s
# 一覧は 1:このセッション / 2:backend / 3:承認待ち / 4:frontend。
# 1 行目にカーソルを当てるとこの会話がプレビューに出るので、Hide のうちに 3 行目へ送る。
Down 2
Sleep 1500ms
Show

# 承認待ちのプレビュー
Sleep 2s
# カーソルを動かすとプレビュー (herdr agent read) が追従する
Down
Sleep 2s
Up
Sleep 1200ms
Up
Sleep 2s
Down
Sleep 2s

# Enter だと herdr agent focus が走って実画面が飛ぶため、録画は Escape で閉じる
Hide
Escape
