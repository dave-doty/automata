// This TM recognizes the language { w:w | w is a string in {0,1}* }
// It is the same as the one described in w-marker-w.tm.

// It demonstrates the use of the ? wildcard in specifying transition rules.

states =              {q1,q2,q3,q4,q5,q6,q7,q8,qA,qR}
input_alphabet =      {0,1,:}
tape_alphabet_extra = {x,_}
start_state =         q1
accept_state =        qA
reject_state =        qR
num_tapes =           1
delta =
  q1,0 -> q2,x,R;
  q1,1 -> q3,x,R;
  q1,: -> q8,:,R;
  q2,? -> q2,?,R;
  q2,: -> q4,:,R;
  q3,? -> q3,?,R;
  q3,: -> q5,:,R;
  q4,0 -> q6,x,L;
  q4,x -> q4,x,R;
  q5,1 -> q6,x,L;
  q5,x -> q5,x,R;
  q6,? -> q6,?,L;
  q6,: -> q7,:,L;
  q7,? -> q7,?,L;
  q7,x -> q1,x,R;
  q8,x -> q8,x,R;
  q8,_ -> qA,_,R;
