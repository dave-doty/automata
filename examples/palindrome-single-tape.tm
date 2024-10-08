// This TM recognizes the language { w in {0,1}* | w = w^R }

states =              {s,r00,r11,r01,r10,l,lx,qA,qR}
input_alphabet =      {0,1}
tape_alphabet_extra = {x,_}
start_state =         s
accept_state =        qA
reject_state =        qR
delta = 
  s,0 -> r00,x,R;
  s,1 -> r11,x,R;
  r00,0 -> r00,0,R;
  r00,1 -> r01,1,R;
  r01,0 -> r00,0,R;
  r01,1 -> r01,1,R;
  r10,0 -> r10,0,R;
  r10,1 -> r11,1,R;
  r11,0 -> r10,0,R;
  r11,1 -> r11,1,R;
  r00,_ -> lx,_,L;
  r11,_ -> lx,_,L;
  r00,x -> lx,x,L;
  r11,x -> lx,x,L;
  lx, 0 -> l,x,L;
  lx, 1 -> l,x,L;
  lx, x -> qA,x,S;
  l,  0 -> l,0,L;
  l,  1 -> l,1,L;
  l,  x -> s,x,R;
  s,  x -> qA,x,S;