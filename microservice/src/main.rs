//https://rust-lang-nursery.github.io/rust-cookbook/database/postgres.html
use postgres::{Client, NoTls, Error};
use std::{thread};
use std::time::Duration;


struct Collected {
    _card_id: i32,
    _owner_id: i32
}
struct Wanted {
    _owner_id: i32,
    _card_id: i32
}



fn main() -> Result<(), Error> {
    let mut client = Client::connect("postgres://finalproject:finalproject@postgres/finalproject", NoTls)?;


    while client.is_valid(Duration::from_secs(30)).unwrap() == () {
        thread::sleep(Duration::from_secs(5));
        let mut owned_list = Vec::new();
        let mut wanted_list = Vec::new();

        // See what everyone owns
        for row in client.query("SELECT owner_id, card_id FROM collected", &[])? {
            let entry = Collected {
                _owner_id: row.get(0),
                _card_id: row.get(1),
            };
            owned_list.push(entry);
        }

        // See what everyone wants
        for row in client.query("SELECT owner_id, card_id FROM wanted", &[])? {
            let entry = Wanted {
                _owner_id: row.get(0),
                _card_id: row.get(1),
            };
            wanted_list.push(entry);
        }

        for owned in &owned_list {
            //println!("User {} has {}", owned._owner_id, owned._card_id);
            for wanted in &wanted_list {
                //println!("User {} wants {}", wanted._owner_id, wanted._card_id);

                if owned._owner_id == wanted._owner_id {
                    // println!("{} = {}", owned._owner_id, wanted._owner_id);
                    // println!("owner: {}, has {}, wants {}", owned._owner_id, owned._card_id, wanted._card_id);
                    if wanted._card_id == owned._card_id {
                        println!("User {} already owns {} from their wantlist! Deleting it now...", owned._owner_id, wanted._card_id);
                        let _ = client.execute("DELETE FROM wanted WHERE card_id = $1", &[&wanted._card_id]);
                    }
                }
            }
        }
    }
    Ok(())
}
