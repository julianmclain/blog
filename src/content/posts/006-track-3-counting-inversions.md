---
title: "[Algorithms Mixtape] track 3 - Counting Inversions"
date: 2020-07-09
---

An inversion of an array is a pair of elements that are "out of order." The
first element of the pair is bigger than the second element, yet it occurs
earlier in the array (assuming ascending sort order). Using some notation, we
can express an inversion as a pair of array indicies `(i, j)` such that `i < j`
and `A[i] > A[j]`.

Using the notation above, we can define 3 types of inversions:

- Left inversion: when `i, j <= n/2`
- Right inversion: when `i, j > n/2`
- Split inversion: when `i <= n/2 < j`

_n_ = the array length

In practice, an interesting application of inversions is measuring the
similarity of 2 ranked lists. For example, imagine you rank your 10 favorite
movies. Then you ask your friend to take the same 10 movies and provide her own
rank list. If your friend ranks the same movies 1 - 10, then there will be no
inversions. If she provides the exact opposite rankings (i.e. 1 becomes 10, 9
becomes 2, etc...), there will be 10 choose 2 inversions (the maximum possible).
Fewer inversions indicates greater similarity.

The concept of measuring the similarity between ranked lists is core to
_collaborative filtering_, a technique used to make recommendations.

## Implementation

### Input

An array containing the numbers 1 through `n` in an arbitrary order.

### Output

The number of inversions of the array.

### Description

A naive approach is to use brute-force to solve:

1. If `n = 1`, return 0
2. Loop through all indices `i`
3. For each index `i`, Loop through all `j` indices bigger than `i`
4. If `A[i] > A[j]`, count an inversion

This has a runtime of _O(n<sup>2</sup>)_... it works, but it's not great!

A better approach is to use the Divide and Conquer Paradigm. If you split the
array in half, you can recusively compute the left and right inversions. Then
you just need to solve for the split inversions and sum the counts.

The key to making this approach work is to see that counting inversions
intersects directly with sorting. Remember that an inversion is essentially
just an element that's "out of order."

The Divide and Conquer approach:

Setup the main function to return the number of inversion _AND_ the sorted
array. That way, you can pass the `merge` function 2 sorted arrays.

`count_inversions(A: array) -> array, int`

1. If `n = 1`, return 0
2. _B_, _x_ = make a recursive call with the first half of the array.
3. _C_, _y_ = make recursive call with the left half of the array.
4. _D_, _z_ = merge _B_ and _C_ while counting all split inversions.
5. Return x + y + z

`merge(B: array, C: array) -> array, int`

Because _B_ and _C_ are already sorted, there's at least one split inversion any
time an element in _C_ is less than an element in _B_. The exact number of split
inversions depends on the number of elements after the current index in _B_.
For example, consider:

_B_ = [1, 3, 4]

_C_ = [2, 5, 6]

When the algorithm compares _C_[0] against _B_[1], it will identify a split
inversion. _C_[0] is less than all remaining elements in _B_ since we know that
_B_ is sorted. There are 2 split inversions, (2, 3) and (2, 4).

Let _n_ equal the length of _C_. If `C[j] < B[i]`, then the number of split
inversions equals `n - i`.

See [mergesort](/004-track-1-mergesort) for a full description of merging
2 sorted arrays.

### Code

```python
# count_inversions.py

def count_inversions(arr):
    arr, count = _count_and_sort(arr)
    return count


def _count_and_sort(arr) -> tuple:
    if len(arr) < 2:
        return arr, 0

    split = len(arr) // 2
    left, left_count = _count_and_sort(arr[:split])
    right, right_count = _count_and_sort(arr[split:])
    sorted_list, split_count = _merge_and_count(left, right)

    total_count = left_count + right_count + split_count
    return sorted_list, total_count


def _merge_and_count(arr1, arr2):
    # Assumes l and r are already sorted
    i = 0
    j = 0
    sorted_list = []
    split_count = 0

    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            sorted_list.append(arr1[i])
            i += 1
        else:
            sorted_list.append(arr2[j])
            j += 1
            split_count += len(arr1) - i

    sorted_list.extend(arr1[i:])
    sorted_list.extend(arr2[j:])

    return sorted_list, split_count
```

## Analysis

### Asymptotic Runtime

Given the above implementation, you can see that algorithm for counting
inversions is mergesort with a small modification that keeps track of the number
of inversions. The relevant question is: if mergesort runs in _O_(_n_ log _n_)
time, does keeping tracking track of the number of inversions impact the
asymptotic runtime?

The answer is a resounding _nope_. Initializing and incrementing a counter can be done
in constant time.

The runtime for computing inversions of an array is:

> _O_(_n_ log _n_)

For a more detailed analysis check out [mergesort](/004-track-1-mergesort). Also, corrections are appreciated - if you see an error, please create a [Github issue](https://github.com/julianmclain/blog/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) 🍻.
