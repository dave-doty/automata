// This TM computes the function f(0^n) = 0^{2n}.

states =              {q0,q1,q2,qD,qA,qR}
input_alphabet =      {0}
tape_alphabet_extra = {!,_}
start_state =         q0
accept_state =        qA
reject_state =        qR
num_tapes =           2
delta =
  q0,0_ -> q1,0!,SR;
  q1,0_ -> q2,00,SR;
  q2,0_ -> q1,00,RR;
  q1,__ -> qD,__,SL;
  qD,_0 -> qD,_0,SL;
  qD,_! -> qA,_!,SR;