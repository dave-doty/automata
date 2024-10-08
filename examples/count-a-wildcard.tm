// This TM counts the number of a's on the first tape and writes that 
// number of 0's on the second tape. It demonstrates the use of the ? 
// wildcard in specifying transition rules. Note that because they have 
// no wildcard symbols, the rules
//   q1,a_ -> q1,a0,RR;
// and
//   q1,__ -> qA,__,SS;
// overrride the wildcard rule
//   q1,?_ -> q1,?_,RS;

states =              {q,qA,qR}
input_alphabet =      {a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}
tape_alphabet_extra = {0,_}
start_state =         q
accept_state =        qA
reject_state =        qR
num_tapes =           2
delta =
  q,?_ -> q, ?_,RS;
  q,a_ -> q, a0,RR;
  q,__ -> qA,__,SS;