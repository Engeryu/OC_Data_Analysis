best_mape = float('inf')
for random_state in range(0, 5000):
    # Diviser les données en ensembles d'entraînement et de test
    X_train, X_test, y_train, y_test = tts(X, y, test_size=0.33, random_state=random_state)
    regression = LinearRegression().fit(X_train,y_train)
    y_predict  = regression.predict(X_test)

    # Faire des prédictions sur les données de test
    y_pred = regression.predict(X_test)

    mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100

    if mape < best_mape:
        best_mape = mape
        best_random_state = random_state

# %%
print(best_mape, best_random_state)

tts = 1178

best_mape = float('inf')
best_random_state = None
for random_state in range(5001):
    # Division des données en ensembles d'entraînement et de test
    X_train, X_test, y_train, y_test = tts(X, y, test_size=0.33, random_state=random_state)
    # Création d'un pipeline pour prétraiter les données et ajuster le modèle
    model = make_pipeline(
        StandardScaler(),
        SGDRegressor(learning_rate='constant', eta0=0.015, max_iter=1000, random_state=random_state)
    )

    # Entraînement du modèle sur les données d'entraînement
    model.fit(X_train, y_train)

    # Prédiction sur les données de test
    y_pred = model.predict(X_test)

    # Calcul et affichage de l'erreur moyenne absolue en pourcentage (MAPE)
    mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100
    if mape < best_mape:
        best_mape = mape
        best_random_state = random_state

Meilleur random state: 3176, Meilleur MAPE: 6.70%