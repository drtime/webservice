# Webservice

Deze webservice is open om hints te sturen naar de iPad van de spelers.

## API

De API is open op een poort en IP adres dat je bij Nick kan Verkrijgen.

**BASE_URL:** `vraag aan nick`

### Hints verkrijgen:

`GET BASE_URL/v1/hints` returned een lijst van hints die naar de spelers gestuurd zijn.

### Hints sturen

`POST BASE_URL/v1/hint` post een nieuwe hint naar de lijst met hints en stuurt deze in realtime naar de app.

### Realtime hints testen

`BASE_URL/realtime/hints` is een webpagina die voor iedere hint een alert stuurt om te testen

### Realtime hints verkrijgen

Er draait een [socket.io](https://socket.io/) webservice op dezelfde poort als de webserver. Deze service verstuurd een packet met de naam `hint` welke het JSON object `{ "content": "Waddup" }` bevat.
