---
title: "[Algorithms Mixtape] track 1 - mergesort"
date: 2020-06-19
---

mergesort was known to John von Neumann as early as 1945. Despite being over 70
years old, it's still one of the choice sorting algorithms today. For large
input sizes, it's run time is faster than other sorting algorithms such as
selection, insertion, and bubble sort.

## Implementation

### Input

an array of _n_ elements.

### Output

A new array with the same elements, sorted from smallest to largest.

### Description:

`mergesort(array)` subroutine:

- If the array has length 1 or less, return a copy. It's already sorted.
- Recursively sort the first half of the input array.
- Recursively sort the second half of the input array.
- Merge the two sorted sub-arrays into one sorted array.

`merge(left, right)` subroutine:

- Create an output array of length `left` + `right`
- Store a pointer to the first element in left, `i`
- Store a pointer to the first element in right, `j`
- Traverse the indicies of the output array as `k`:
  - If the current left element `left[i]` is less than the current right
    element `right[j]`, copy the left element `left[i]` to the output array at
    position `k`. Increment the pointer `i`.
  - If the current right element `right[j]` is less than the current left
    element `left[i]`, copy the right element `right[i]` to the output array at
    position `k`. Increment the pointer `j`.

```python
def mergesort(num_list):
    if len(num_list) <= 1:
        return num_list[:]

    split = len(num_list) // 2
    left = mergesort(num_list[:split])
    right = mergesort(num_list[split:])
    return merge(left, right)


def merge(l, r):
    index_l = 0
    index_r = 0
    sorted_list = []
    while index_l < len(l) and index_r < len(r):
        if l[index_l] <= r[index_r]:
            sorted_list.append(l[index_l])
            index_l += 1
        else:
            sorted_list.append(r[index_r])
            index_r += 1

    sorted_list.extend(l[index_l:])
    sorted_list.extend(r[index_r:])
    return sorted_list
```

Source - [Algorithms
Mixtape - mergesort](https://github.com/julianmclain/algorithms-mixtape/tree/master/src/mergesort)

Note - the `merge` implementation doesn't exactly match the description I gave.
See my notes in the source repo for an explanation: [merge.py](https://github.com/julianmclain/algorithms-mixtape/blob/163c4e263c5376b1c5777112a9bc5872f6351caa/src/mergesort/mergesort.py).

## Analysis

mergesort is a canonical "divide-and-conquer" algorithm. It splits the input
array into two sub-problems, recursively solves each sub-problem, and then
combines the solutions to the sub-problems.

### Asymptotic run time

The [Master
Method](<https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)>)
states that the runtine of a divide-and-conquer algorithm denoted _T(n)_ can be
expressed by the recurrence relation:

> _T_(_n_) <= _aT_(_n_/_b_) + _O_(_n_<sup>_d_</sup>)

Where _a_ is the number of recrusive calls, _b_ is the factor by which the input
size shrinks in every subproblem, and _d_ is the exponent in the running time of
the "combine" step.

For mergesort, we fill in the following constants:

- _a_ = 2
- _b_ = 2
- _d_ = 1

This puts the run time in category 1 of 3 since _a_ = _b<sup>d</sup>_. Category 3 run
times are defined as _T_(_n_) = _O_(_n_<sup>_d_</sup> log _n_). Filling in the
_d_ parameter, we end up with a run time of:

> _O_(_n_ log _n_)

Ok, the Master Method is a cool party trick, but the die-hard skeptic in me
wasn't convinced after I ran that black box analysis. mergesort is a hall of fame
algorithm, and I wanted better proof that it can sort an array in _O_(_n_ log _n_)
time.

Intuitively, we can confirm the Master Method by analyzing the algorithm as a
recursion tree. The root node of the tree corresponds to the outermost call with
the original input _n_ (level 0). Except in the base case, each call to
`mergesort` produces two recursive calls modeled as child nodes.

![recursion-tree](https://www.dropbox.com/s/18hvfyg61rlt3dc/recursion-tree.jpg?raw=1)

The diagram makes it clear that the total work performed equals the work done
per level multiplied by the number of levels. Ultimately, what we need is:

> _Total work_ = _total work per level_ \* _number of levels_

Let's start by determining the amount of work done per level:

> _Total work per level_ = _work per sub-problem_ \* _number of sub-problems_

Returning to the high-level description of `mergesort` above, there are 3 steps
(excluding the base case):

1. recusively sort the left
2. recursively sort the right
3. `merge`

When analyzing the work done at a single level, we can ignore the recursive
calls. The work performed in recursive calls will be accounted for when we
multiply by the number of levels in the recursion tree. As a result, the total
work done in a given call to `mergesort` is equal to the amount of work done in
the `merge` subroutine. `merge` has to examine every element in the left and
right input arrays, so the work performed by merge is proportional to the input
size. Return to our recursion tree diagram and notice the relationship between
the size of _n_ and the number of sub-problems at a given level. Mergesort has an
especially satisfying design because the amount of work done in each sub-problem
decreases at the same rate that the number of sub-problems increases. They
operate in perfect equalibrium. No matter the level, the aggregate input size is
_n_. Given that the aggregate input size at every level equals _n_ and
that `merge` must visit every element in the input, we can confidently say that
`merge`, and consequently `mergesort`, will perform _O(n)_ work at every level.

Now for the number of levels. Looking at the recursion tree, you can see that
the input size shirnks by a factor of 2 with each level (e.g. n, n/2, n/4, n/8,
n/16...). Eventually, the input size will be equal or less than 1. At that
point, the base case kicks in and the recursion ends. To determine the number of
levels, what we need is an operation that will tell us how many times we need to
divide _n_ by 2 until we reach a number that is 1 or less. Luckly, this is the
exact definition of log<sub>2</sub>. For example:

> log<sub>2</sub>16 = 4
>
> 4 is the number of times you need to divide 16 by 2 until you reach 1 or less

Equipped with this info, we know that number of levels in the recursion tree is
log<sub>2</sub> _n_. Let's return to our original forumla and fill in the _total
work per level_ and the _number of levels_.

> _Total work_ = _O_(_n_) \* log<sub>2</sub> _n_

Logarithms of a different base only differ by a constant factor so we can eliminate
the base: _O_(_n_ log _n_). There it is! The Master Method holds up, and we have an
intuitive understanding for why mergesort runs in _O_(_n_ log _n_) time.

Corrections are appreciated! If you see an error, please create a [Github issue](https://github.com/julianmclain/blog/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).
