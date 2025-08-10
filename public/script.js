document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('drug-form');
    const drugNameInput = document.getElementById('drug-name');
    const surgeryDateInput = document.getElementById('surgery-date');
    const resultsList = document.getElementById('results-list');

    // Dify APIの情報を設定
    const difyApiUrl = 'https://api.dify.ai/v1/workflows/run';
    const difyApiKey = 'app-V3WMGr8Z52ZojpjM1IyYyrJU'; // あなたのAPIキー

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // フォームのデフォルト送信を防ぐ

        const drugName = drugNameInput.value;
        const surgeryDate = surgeryDateInput.value;

        console.log('入力された薬剤名:', drugName);
        console.log('入力された手術日:', surgeryDate);

        // Difyに送信するデータを作成
        const requestData = {
            inputs: {
                drug_name: drugName,
                ope_day: surgeryDate.replace(/-/g, '/') // yyyy-mm-dd を yyyy/mm/dd に変換
            },
            response_mode: 'blocking',
            user: 'webapp-user' // ユーザーを識別するための一意のID
        };

        console.log('Difyへのリクエストデータ:', JSON.stringify(requestData, null, 2));

        try {
            // Dify APIへリクエストを送信
            const response = await fetch(difyApiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${difyApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            console.log('Difyからのレスポンスステータス:', response.status);

            if (!response.ok) {
                throw new Error(`APIエラー: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Difyからのレスポンス(JSON):', result);

            // Difyからのテキストレスポンスを抽出
            // 実際のレスポンス構造に合わせてキーを調整してください (例: result.answer, result.data.textなど)
            const resultText = result.data.outputs.text; 

            if (resultText) {
                // 結果をリストに追加して表示
                const newListItem = document.createElement('li');
                newListItem.textContent = resultText;
                resultsList.appendChild(newListItem);
            } else {
                throw new Error('レスポンスに有効なテキストが含まれていません。');
            }

        } catch (error) {
            console.error('エラーが発生しました:', error);
            // エラーメッセージを画面に表示
            const errorItem = document.createElement('li');
            errorItem.textContent = `エラー: ${error.message}`;
            errorItem.style.backgroundColor = '#f8d7da';
            errorItem.style.borderColor = '#f5c6cb';
            resultsList.appendChild(errorItem);
        }
    });
});
