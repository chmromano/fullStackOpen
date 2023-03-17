```mermaid

sequenceDiagram
participant browser
participant server

    Note right of browser: The browser interrupts the default behaviour of form submit

    Note right of browser: The browser creates a new note object

    Note right of browser: The browser saves the new note to a local array of notes

    Note right of browser: The browser redraws the notes

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note left of server: The server will save the sent note

```
