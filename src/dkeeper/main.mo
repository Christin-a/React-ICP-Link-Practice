import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {
  public type Note ={ //creates a Note data type 
    title: Text;
    content: Text;
  };
  
  stable var notes: List.List<Note> = List.nil<Note>(); // creates List list (similar to a js array) that will consist of data from Notes and sets is to be empty

public func createNote(titleText: Text, contentText: Text) { //creates a function that adds a new note to the Notes list
  let newNote: Note ={
    title = titleText;
    content =contentText;
  };

  notes := List.push(newNote, notes); //prepends new note to the beginning of the notes list
  Debug.print(debug_show(notes));

};

public query func readNotes(): async [Note] { //creates a public read-only function
  return List.toArray(notes); // turns notes list from a list data type to an array data type
};  

public func removeNote(id: Nat) {
  let listFront = List.take(notes, id); // takes everything before the item with the specified id
  let listBack = List.drop(notes, id + 1); // drops everything after the item with the specified id
  notes := List.append(listFront, listBack); // appends the items before and after the specified id to update the notes array
}


};
