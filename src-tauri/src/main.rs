#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .setup(|_app| {
      // listen to the `event-name` (emitted on any window)
      // let id = app.listen_global("event-name", |event| {
      // println!("got event-name with payload {:?}", event.payload());
      // });
      // // unlisten to the event using the `id` returned on the `listen_global` function
      // // an `once_global` API is also exposed on the `App` struct
      // app.unlisten(id);

      // // emit the `event-name` event to all webview windows on the frontend
      // app.emit_all("event-name", Payload { message: "Tauri is awesome!".into() }).unwrap();
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application!");
}
